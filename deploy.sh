#!/bin/bash
# Magical Website - Auto Deployment Script
# This script helps deploy both frontend and backend to production

echo "🚀 Magical Website Deployment Helper"
echo "======================================"
echo ""
echo "Choose your deployment option:"
echo ""
echo "1. Deploy to Railway (Backend) + Vercel (Frontend) - RECOMMENDED"
echo "2. Deploy to Heroku (Backend) + Netlify (Frontend)"
echo "3. Docker Deployment"
echo "4. Manual Deployment Instructions"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 RAILWAY + VERCEL DEPLOYMENT"
        echo "================================"
        echo ""
        echo "Step 1: Deploy Backend to Railway"
        echo "  1. Go to https://railway.app"
        echo "  2. Sign up with GitHub"
        echo "  3. Create new project → GitHub repo"
        echo "  4. Select this repository"
        echo "  5. Set environment variables:"
        echo "    - MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/magical"
        echo "    - JWT_SECRET=your_secret_key"
        echo "    - NODE_ENV=production"
        echo "  6. Deploy!"
        echo ""
        echo "Step 2: Deploy Frontend to Vercel"
        echo "  1. Go to https://vercel.com"
        echo "  2. Sign up with GitHub"
        echo "  3. Import project"
        echo "  4. Set root directory: ./frontend"
        echo "  5. Add env var: REACT_APP_API_URL=<your-railway-backend-url>"
        echo "  6. Deploy!"
        echo ""
        ;;
    2)
        echo ""
        echo "🚀 HEROKU + NETLIFY DEPLOYMENT"
        echo "================================"
        echo ""
        echo "Coming soon..."
        ;;
    3)
        echo ""
        echo "🐳 DOCKER DEPLOYMENT"
        echo "====================="
        echo ""
        echo "Docker files are ready in their respective folders"
        echo "Run: docker-compose up -d"
        echo ""
        ;;
    4)
        echo ""
        echo "📖 MANUAL DEPLOYMENT"
        echo "===================="
        echo ""
        echo "See DEPLOYMENT.md for detailed instructions"
        echo ""
        ;;
    *)
        echo "Invalid choice"
        ;;
esac
