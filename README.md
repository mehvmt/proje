# 3D Sanal Prova Odası Uygulaması

Bu proje, kullanıcıların kendi vücut ölçülerine göre oluşturulan 3D avatarlar üzerinde kıyafetleri denemelerine olanak sağlayan bir sanal prova odası uygulamasıdır.

## Özellikler

- Kullanıcılar boy, kilo, bel çevresi gibi ölçülerini girerek avatarlarını özelleştirebilirler
- Avatarlar "idle" (bekleme) ve "spin" (360° dönüş) animasyonlarıyla görüntülenebilir
- Kullanıcı saç ve sakal stillerini seçebilir
- Kıyafet görselleri yüklendiğinde, Flask API'si OpenCV tabanlı bir arka plan temizleme modeli ile görseli şeffaf PNG'ye dönüştürür
- Elde edilen şeffaf kıyafet resmi avatar üzerine React-Three-Fiber kullanılarak yerleştirilir

## Teknoloji Yığını

### Frontend

- React (18.x)
- Tailwind CSS (3.x)
- Three.js (0.155.0) + React-Three-Fiber + @react-three/drei
- Animasyonlar için Three.js AnimationMixer
- Fetch API ile Flask backend'e istekler

### Backend

- Python 3 + Flask
- flask-cors ile CORS yönetimi
- OpenCV + Pillow + NumPy kullanarak arka plan temizleme
- `/upload` endpoint'i: POST ile resim alır, şeffaf PNG base64 döner
- Gunicorn + `$PORT` bind ile production başlatma

## Kurulum

### Geliştirme Ortamı

1. Repo'yu klonlayın:
\`\`\`
git clone https://github.com/mehvmt/proje.git
cd 3d-sanal-prova-odasi
\`\`\`

2. Frontend bağımlılıklarını yükleyin:
\`\`\`
cd frontend
npm install
\`\`\`

3. Backend bağımlılıklarını yükleyin:
\`\`\`
cd ../backend
pip install -r requirements.txt
\`\`\`

4. Geliştirme sunucularını başlatın:

   a. Frontend:
   \`\`\`
   cd ../frontend
   npm start
   \`\`\`

   b. Backend:
   \`\`\`
   cd ../backend
   flask run
   \`\`\`

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın

### Production Deployment (Render.com)

1. Render.com hesabınızda iki servis oluşturun:

   a. Web Service:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT`

   b. Static Site:
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   - Environment Variables:
     - `REACT_APP_API_URL`: Backend servisinizin URL'si

2. Frontend'deki API URL'sini güncelleyin:
   
   `.env` dosyasında veya Render.com environment variables kısmında:
   \`\`\`
   REACT_APP_API_URL=https://your-backend-service.onrender.com
   \`\`\`

## Kullanım

1. Vücut ölçülerinizi girin
2. Saç ve sakal stilinizi seçin
3. Kıyafet tipini seçin ve bir kıyafet resmi yükleyin
4. Avatarınızı döndürerek kıyafetin nasıl durduğunu kontrol edin

## Lisans

MIT
