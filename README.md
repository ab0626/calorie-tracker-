# CalAI - AI-Powered Calorie Tracker

A modern calorie tracking application that uses AI to recognize food, drinks, and snacks from photos. Works seamlessly on mobile devices and supports foods from diverse cultures worldwide.

![CalAI](https://img.shields.io/badge/CalAI-Calorie%20Tracker-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)

## 🌟 Features

- 📷 **Camera-Based Food Recognition**: Take photos or upload images to identify food items using OpenAI Vision API
- 🌍 **Multi-Cultural Food Support**: Recognizes foods from Asian, Middle Eastern, Latin American, European, African cuisines, and more
- 📱 **Mobile-Friendly**: Responsive design optimized for phone use
- 📊 **Calorie Tracking**: Track daily and weekly calorie intake with accurate calculations
- 🍽️ **Meal Logging**: Log breakfast, lunch, dinner, and snacks
- 📈 **Statistics Dashboard**: View daily and weekly calorie statistics
- 🎯 **Accurate Calorie Data**: Uses USDA data and nutrition labels for precise calorie information

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ab0626/calorie-tracker-.git
   cd calorie-tracker-
   ```

2. **Set up Backend**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # macOS/Linux
   pip install -r requirements.txt
   ```
   
   Create `backend/.env`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Run backend:
   ```bash
   python main.py
   ```

3. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the app**
   - Local: http://localhost:3000
   - Mobile: http://YOUR_IP:3000 (same network)

## 📦 Deployment

### Deploy to Production (Free)

**Backend (Render):**
1. Go to https://render.com
2. Create Web Service → Connect GitHub repo
3. Set Root Directory: `backend`
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variable: `OPENAI_API_KEY`

**Frontend (Vercel):**
1. Go to https://vercel.com
2. Import Project → Connect GitHub repo
3. Set Root Directory: `frontend`
4. Add Environment Variable: `VITE_API_URL` = your Render backend URL

See [DEPLOY_NOW.md](DEPLOY_NOW.md) for detailed deployment instructions.

## 🏗️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **OpenAI Vision API**: Food recognition from images
- **SQLite**: Database (upgradeable to PostgreSQL)

### Frontend
- **React**: UI framework
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **React Webcam**: Camera integration
- **Axios**: HTTP client

## 📖 API Endpoints

### Food Recognition
- `POST /api/recognize-food` - Recognize food from image

### Meals
- `POST /api/meals` - Create a new meal log
- `GET /api/meals` - Get meals for a user (optional date filter)

### Statistics
- `GET /api/stats/daily` - Get daily calorie statistics
- `GET /api/stats/weekly` - Get weekly calorie statistics

## 🍕 Food Database

The application includes a comprehensive database of foods from various cultures stored in `backend/data/food_database.json`. The database includes:

- Basic foods with USDA calorie data
- Packaged foods with nutrition label data
- Complex combinations (e.g., "chicken taco salad with lettuce and tomatoes")
- Home-cooked meal estimates

## 📱 Mobile Access

The application is fully responsive and works on mobile devices. When running locally:

1. Find your computer's IP address
2. Access `http://YOUR_IP:3000` from your phone's browser
3. Make sure both devices are on the same network

## 📚 Documentation

- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [DEPLOY_NOW.md](DEPLOY_NOW.md) - Deployment guide
- [DEPLOY_STEP_BY_STEP.md](DEPLOY_STEP_BY_STEP.md) - Detailed deployment steps
- [ACCURACY_REPORT.md](ACCURACY_REPORT.md) - Calorie accuracy information

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🙏 Acknowledgments

- OpenAI for Vision API
- USDA FoodData Central for calorie data
- All contributors and testers

---

**Made with ❤️ for healthy living**
