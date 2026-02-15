# Infinity Fitness - Frontend

<div align="center">

![Infinity Fitness Logo](src/assets/gym-logo.png)

**Premium Fitness Training Platform - Client Application**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) • [Documentation](../context/README.md) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Analytics](#analytics)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Infinity Fitness is a modern, full-stack web application designed for fitness enthusiasts and trainers. The frontend provides a premium, glassmorphic UI with smooth animations, responsive design, and an intuitive user experience.

### Key Highlights

- 🎨 **Premium Design**: Glassmorphism effects with gradient accents
- 📱 **Fully Responsive**: Mobile-first approach, works on all devices
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🔒 **Secure**: JWT-based authentication
- ♿ **Accessible**: WCAG compliant with keyboard navigation
- 🎥 **Dynamic**: Video backgrounds and smooth animations

---

## ✨ Features

### Authentication
- ✅ User login and registration
- ✅ JWT token-based authentication
- ✅ Protected routes
- ✅ Session persistence
- ✅ Secure logout

### User Dashboard
- ✅ Workout statistics cards
- ✅ Goal tracking
- ✅ Achievement badges
- ✅ Weekly activity overview
- ✅ Beautiful Lucide React icons

### Course Management
- ✅ Browse available courses
- ✅ View course details
- ✅ Location-based filtering
- ✅ Instructor information

### Workout Tracking
- ✅ Create workout plans
- ✅ Log exercises
- ✅ Track progress over time
- ✅ View workout history

---

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing

### Styling
- **Tailwind CSS** - Utility-first CSS (via CDN)
- **Custom CSS** - Glassmorphism effects
- **Space Grotesk** - Premium typography

### Icons & Assets
- **Lucide React** - Beautiful SVG icons
- **Custom Assets** - Branded logos and videos

### HTTP Client
- **Fetch API** - Native browser API for requests

### Development Tools
- **ESLint** - Code linting
- **Vite Dev Server** - Hot module replacement (HMR)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16.x
- **npm** >= 8.x or **yarn** >= 1.22.x
- Backend server running (see [server README](../server/README.md))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1iamharshraj/Infinity-fitness-web-trainer-frontend.git
   cd Infinity-fitness-web-trainer-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
client/
├── public/                      # Static assets
│   ├── favicon.png             # Custom Infinity Fitness favicon
│   └── vite.svg                # Default Vite logo
│
├── src/
│   ├── assets/                 # Images, videos, fonts
│   │   ├── gym-logo.png        # Infinity Fitness logo
│   │   └── silk-*.mp4          # Background videos
│   │
│   ├── components/             # Reusable components
│   │   ├── LogoutButton.jsx    # Logout functionality
│   │   └── ...
│   │
│   ├── context/                # React Context providers
│   │   └── AuthContext.jsx     # Authentication state
│   │
│   ├── pages/                  # Route pages
│   │   ├── LoginPage.jsx       # Login/auth page
│   │   ├── DashboardPage.jsx   # User dashboard
│   │   ├── CoursesPage.jsx     # Course listing
│   │   └── WorkoutListPage.jsx # Workout management
│   │
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
│
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

### Development Server

The dev server runs on **http://localhost:5173** with:
- ⚡ Hot Module Replacement (HMR)
- 🔄 Automatic page reload
- 🐛 Source maps for debugging

### Code Style

- **ESLint** for JavaScript linting
- **Prettier** (optional) for code formatting
- Follow React best practices
- Use functional components with hooks

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Analytics (optional)
VITE_ANALYTICS_ID=your_vercel_analytics_id
```

**Note**: All Vite environment variables must be prefixed with `VITE_`.

---

## 🎨 Design System

### Colors
```css
Primary Red:    #DC2626
Dark BG:        #0A0A0A
Glass White:    rgba(255, 255, 255, 0.05)
Text White:     #FFFFFF
Text Muted:     rgba(255, 255, 255, 0.5)
```

### Typography
- **Font Family**: Space Grotesk
- **Weights**: 300, 400, 500, 600, 700
- **Headings**: Bold, uppercase, letter-spaced

### Effects
- **Glassmorphism**: `backdrop-filter: blur(20px)`
- **Transitions**: `0.3s ease`
- **Animations**: Smooth, subtle

---

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# Output directory: dist/
# Contains minified HTML, CSS, JS, and assets
```

### Build Optimizations
✅ Code splitting  
✅ Tree shaking  
✅ Minification  
✅ Asset optimization  
✅ Gzip compression ready  

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

### Manual Deployment

1. Build the project: `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure server to serve `index.html` for all routes (SPA)

### Deployment Platforms
- ✅ Vercel (recommended)
- ✅ Netlify
- ✅ GitHub Pages
- ✅ AWS S3 + CloudFront
- ✅ Firebase Hosting

---

## 📊 Analytics

### Vercel Analytics

This project includes Vercel Analytics for tracking:
- Page views
- User interactions
- Performance metrics
- Web vitals

Analytics are automatically enabled when deployed to Vercel.

**Learn more**: [Vercel Analytics Documentation](https://vercel.com/analytics)

---

## 🔒 Security

### Best Practices Implemented
- ✅ JWT tokens stored securely
- ✅ Protected routes
- ✅ Input sanitization
- ✅ HTTPS enforced (production)
- ✅ No sensitive data in localStorage

### Security Headers
Configure in production:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login flow (desktop & mobile)
- [ ] Protected routes redirect
- [ ] Course listing displays
- [ ] Workout creation
- [ ] Video background loads
- [ ] Responsive layouts
- [ ] Logout functionality

### Future: Automated Testing
- Unit tests (Vitest)
- Integration tests (React Testing Library)
- E2E tests (Playwright)

---

## ♿ Accessibility

### Features
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Screen reader friendly
- ✅ Color contrast ratios meet WCAG AA

---

## 🐛 Known Issues

No critical issues at this time! 🎉

For minor issues or feature requests, please check the [Issues](../../issues) tab.

---

## 📝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed
- Test thoroughly before submitting

---

## 📚 Additional Documentation

- [Development Timeline](../context/development-timeline.md)
- [Features Implemented](../context/features-implemented.md)
- [Login Page Development](../context/login-page-development.md)
- [Dashboard Development](../context/dashboard-development.md)
- [Bug Fixes & Improvements](../context/bug-fixes-and-improvements.md)
- [Current Status](../context/current-status.md)

---

## 📞 Support

- **Documentation**: Check the `/context` folder
- **Issues**: [GitHub Issues](../../issues)
- **Email**: support@infinityfitness.com

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing-fast build tool
- Lucide for beautiful icons
- Vercel for hosting and analytics
- All contributors and users!

---

<div align="center">

**Built with ❤️ for fitness enthusiasts**

[⬆ Back to top](#infinity-fitness---frontend)

</div>
