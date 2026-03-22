# Supreme Chappathi 🫓

A full-stack MERN website for Supreme Chappathi — a mini food factory in Tirupur, Tamil Nadu.

## 🛠 Tech Stack

- **Frontend**: React (Vite) + Vanilla CSS + AOS Animations
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Icons**: React Icons

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd server
npm install
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Seed Products
```bash
cd server
npm run seed
```

## 📁 Project Structure
```
supreme-chappathi/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Navbar, Footer, WhatsApp
│   │   ├── context/      # Theme & Cart contexts
│   │   ├── pages/        # 11 page components
│   │   └── styles/       # Global CSS design system
│   └── index.html
├── server/               # Express backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── seed.js           # Product seeder
│   └── server.js
└── README.md
```

## 🌐 Features
- 🌙 Dark/Light mode toggle
- 🛒 Full cart & checkout flow
- 🚌 Bus delivery system
- 🏭 Animated factory production line
- 🍽️ Catering enquiry system
- 📱 WhatsApp integration
- 📍 Google Maps embed (Tirupur)
- 🎨 Stunning UI with animations

## 🚀 Deployment

### Frontend → Vercel
```bash
cd client
npm run build
# Deploy dist/ to Vercel
```

### Backend → Render
Deploy the `server/` directory with:
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `MONGODB_URI`, `PORT`, `CORS_ORIGIN`
