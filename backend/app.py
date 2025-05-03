import os
import cv2
import numpy as np
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

def remove_background(image_data, image_type):
    """
    Remove the background from an image using OpenCV
    
    Args:
        image_data: The image data as bytes
        image_type: The type of clothing (tshirt, pants, etc.)
        
    Returns:
        A transparent PNG image as base64 string
    """
    # Convert image data to numpy array
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Convert to RGB (OpenCV uses BGR)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply threshold
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Create mask
    mask = np.zeros(img.shape[:2], np.uint8)
    
    # Draw contours on mask
    cv2.drawContours(mask, contours, -1, 255, -1)
    
    # Apply GrabCut algorithm for better segmentation
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    
    # Define rectangle covering the object
    if len(contours) > 0:
        x, y, w, h = cv2.boundingRect(max(contours, key=cv2.contourArea))
        rect = (x, y, w, h)
    else:
        # If no contours found, use the whole image
        rect = (0, 0, img.shape[1], img.shape[0])
    
    # Apply GrabCut
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
    
    # Create mask where sure and likely background are 0, and sure foreground is 1
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
    
    # Create transparent image
    img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    img_rgba[:, :, 3] = mask2 * 255
    
    # Convert to PIL Image
    pil_img = Image.fromarray(cv2.cvtColor(img_rgba, cv2.COLOR_BGRA2RGBA))
    
    # Save to bytes buffer
    buffer = io.BytesIO()
    pil_img.save(buffer, format="PNG")
    
    # Convert to base64
    img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    
    return img_base64

@app.route('/upload', methods=['POST'])
def upload_image():
    """
    Endpoint to receive image, remove background, and return transparent PNG
    """
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    clothing_type = request.form.get('type', 'tshirt')
    
    # Read image data
    image_data = file.read()
    
    try:
        # Process image
        transparent_image_base64 = remove_background(image_data, clothing_type)
        
        # Return as data URL for direct use in <img> src
        data_url = f"data:image/png;base64,{transparent_image_base64}"
        
        return jsonify({
            'image': data_url,
            'type': clothing_type
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    # Get port from environment variable for Render deployment
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)