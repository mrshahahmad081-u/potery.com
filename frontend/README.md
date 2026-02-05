# Magical Website Frontend

A stunning 3D web experience with magical animations using Three.js, GSAP, and Particles.js.

## ✨ Features

✅ **3D Magical Logo** - Interactive Three.js 3D rendering
✅ **Smooth Animations** - GSAP-powered entrance animations  
✅ **Particle Effects** - Dynamic particle.js background
✅ **Admin Portal** - Login system with upload functionality
✅ **File Management** - Upload images, poetry, and videos
✅ **Responsive Design** - Works on desktop and mobile devices
✅ **Modern UI** - Glassmorphism design with neon glow effects

## 🚀 Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup

1. Enter the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=production
```

## 🏃 Running the Frontend

### Development Mode
```bash
npm start
```
Server runs on http://localhost:3000

### Using HTTP Server
```bash
npx http-server -p 3000 -c-1
```

### Or with Python
```bash
python3 -m http.server 3000
# or for Python 2
python -m SimpleHTTPServer 3000
```

## 📁 Project Structure

```
frontend/
├── index.html            # Main HTML file
├── css/
│   ├── style.css        # Main styles
│   ├── animations.css   # Animation keyframes
│   └── threejs.css      # Three.js specific styles
├── js/
│   ├── threeApp.js      # Three.js 3D logo setup
│   ├── gsapAnimations.js# GSAP animation controller
│   ├── auth.js          # Authentication system
│   ├── upload.js        # File upload system
│   └── main.js          # Main initialization
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔐 Admin Login

Demo Credentials:
- Username: `admin`
- Password: `magic123`

For production, these should come from your backend API.

## 📡 API Integration

The frontend connects to the backend API at `http://localhost:5000/api`:

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user (requires token)

### Content Endpoints
- `GET /content` - Fetch all content
- `GET /content/:id` - Fetch single content
- `POST /content` - Create content (admin)
- `PUT /content/:id` - Update content (admin)
- `DELETE /content/:id` - Delete content (admin)

### Upload Endpoints
- `POST /upload/single` - Upload single file
- `POST /upload/multiple` - Upload multiple files
- `DELETE /upload/:filename` - Delete file

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-glow: #8a2be2;
    --secondary-glow: #00ffff;
    --tertiary-glow: #ff00ff;
    --dark-bg: #0a0a1a;
    /* ... more variables ... */
}
```

### Animations
Modify speeds and effects in:
- `css/animations.css` - CSS keyframes
- `js/gsapAnimations.js` - GSAP timeline animations
- `js/threeApp.js` - Three.js animation loop

### Particles
Configure in `js/gsapAnimations.js` in the `particlesJS()` initialization

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### GitHub Pages
1. Update `package.json` with `"homepage": "https://yourusername.github.io/repo"`
2. Add deploy scripts
3. Push to GitHub

### Traditional Hosting
Simply upload all files to your web server:
```bash
scp -r . user@your-server:/var/www/html/
```

## 🔧 Troubleshooting

### 3D Logo Not Rendering
- Check browser console for Three.js errors
- Ensure WebGL is enabled in your browser
- Try a different browser (Chrome, Firefox, Safari)

### Animations Not Working
- Verify GSAP library is loaded (check console)
- Ensure browser supports CSS animations
- Check for JavaScript errors in console

### API Connection Issues
- Verify backend server is running on port 5000
- Check CORS configuration in backend
- Update API URL in `.env`
- Open developer tools Network tab to debug requests

### Particles Not Showing
- Check if particles.js library loaded from CDN
- Verify `#particles-js` div exists
- Check browser console for errors

## 📚 Libraries Used

- **Three.js** - 3D graphics library
- **GSAP** - Animation library
- **Particles.js** - Particle effects
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📝 To-Do Features

- [ ] Gallery page with content display
- [ ] User profile page
- [ ] Search functionality
- [ ] Dark/Light theme toggle
- [ ] Mobile app version
- [ ] Comment system
- [ ] Social sharing

## 🐛 Known Issues

- Mobile animations may be slower on low-end devices
- Three.js may have performance issues on very old browsers
- Particles.js can impact performance with very high particle counts

## 📞 Support & Contact

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Ensure backend API is running
4. Check network requests in Developer Tools

## 📄 License

MIT License - Feel free to use this project for your purposes

## ✅ Deployment Checklist

- [ ] Update API_URL in environment
- [ ] Test all login credentials
- [ ] Verify file upload works
- [ ] Check mobile responsiveness
- [ ] Optimize images for production
- [ ] Minify CSS/JS (optional)
- [ ] Set up error tracking
- [ ] Enable HTTPS
- [ ] Configure CDN for assets
- [ ] Monitor performance

---

**Status**: ✅ READY FOR DEPLOYMENT
**Last Updated**: February 2026
