# 🚀 Deployment & Hosting Guide

Complete guide to deploy Magical Website to production.

## 📋 Pre-Deployment Checklist

- [ ] Both frontend and backend are tested
- [ ] All environment variables configured
- [ ] Database is set up and accessible
- [ ] SSL certificates ready (if applicable)
- [ ] Domain name registered
- [ ] CORS settings configured

## 🌐 Deployment Scenarios

### Scenario 1: Separate Hosting (Recommended)

**Frontend**: Vercel / Netlify / GitHub Pages
**Backend**: Heroku / Railway / DigitalOcean

#### Step 1: Deploy Backend (Heroku Example)

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create your-magical-api

# Add environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secret-key
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/magical_website
heroku config:set FRONTEND_URL=https://your-domain.com

# Deploy
git push heroku main

# Verify deployment
heroku open
```

Backend URL: `https://your-magical-api.herokuapp.com`

#### Step 2: Deploy Frontend (Vercel Example)

```bash
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# REACT_APP_API_URL=https://your-magical-api.herokuapp.com
```

Frontend URL: `https://magical-website.vercel.app`

### Scenario 2: Same Server (VPS/Dedicated)

Both frontend and backend on one server.

```bash
# 1. SSH to server
ssh user@your-server.com

# 2. Clone repository
git clone https://github.com/yourusername/magical-website.git
cd magical-website

# 3. Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with production values
npm install -g pm2
pm2 start server.js --name "magical-api"

# 4. Setup frontend
cd ../frontend
npm install

# 5. Build frontend (if needed)
npm run build

# 6. Serve with nginx
sudo apt-get install nginx
```

Nginx configuration (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/frontend;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Scenario 3: Docker (Cloud)

Create Docker images for both services.

**Backend Dockerfile**:
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**Frontend Dockerfile**:
```dockerfile
FROM node:16-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Docker Compose**:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/magical_website
      - NODE_ENV=production
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## 🔒 Security Setup

### 1. HTTPS/SSL Certificate

**Using Let's Encrypt (Free)**:
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d your-domain.com -d www.your-domain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 2. CORS Configuration

Backend (`config.js`):
```javascript
module.exports = {
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://your-domain.com',
    // ... other config
};
```

### 3. Environment Variables

Never commit `.env` file.

```bash
# Create secure .env
touch backend/.env
chmod 600 backend/.env

# Add to .gitignore
echo ".env" >> backend/.gitignore
```

## 📊 Database Setup

### MongoDB Cloud (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Whitelist IP address
6. Update `MONGODB_URI` in backend config

### Local MongoDB

```bash
# Install
brew install mongodb-community  # macOS
sudo apt-get install mongodb     # Linux

# Start service
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux

# Verify
mongosh
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          cd backend
          npm install
          npm run build
          
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
          npm run deploy

      - name: Health Check
        run: |
          curl https://api.your-domain.com/api/health
          curl https://your-domain.com
```

## 📈 Monitoring & Logging

### Backend Monitoring (PM2)

```bash
# Monitor in real-time
pm2 monit

# View logs
pm2 logs magical-api

# Save config
pm2 save
pm2 startup
```

### Log Aggregation

```bash
# Install logging service
npm install winston

# Configure in backend
```

### Uptime Monitoring

Use services like:
- Uptime Robot (free)
- Statuspage (premium)
- New Relic (premium)

## 🧪 Post-Deployment Testing

```bash
# Test Backend
curl https://api.your-domain.com/api/health

# Test Frontend
curl https://your-domain.com

# Test Login
curl -X POST https://api.your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test Upload
curl -X POST https://api.your-domain.com/api/upload/single \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@image.jpg"
```

## 🚨 Troubleshooting Deployment

### Backend Connection Issues
```bash
# Check if backend is running
curl https://api.your-domain.com/api/health

# Check logs
pm2 logs magical-api

# Verify environment variables
heroku config  # For Heroku
```

### Frontend Not Loading API
- Check CORS settings in backend
- Verify API URL in frontend .env
- Check browser console for errors
- Verify database connection status

### Database Connection Timeout
- Check Whitelist IP in MongoDB Atlas
- Verify connection string
- Test local MongoDB connection
- Check firewall rules

## 🔄 Rollback Procedure

### If Deployment Fails

**Heroku**:
```bash
heroku releases
heroku rollback v10  # Rollback to previous version
```

**Vercel**:
- Dashboard → Deployments
- Click on previous deployment
- Click "Redeploy"

**GitHub Pages**:
- Revert to previous commit
- Push to main branch

## 📞 Hosting Providers Comparison

| Provider | Cost | Ease | Scaling | Support |
|----------|------|------|---------|---------|
| Vercel | Free/Paid | Very Easy | Excellent | Good |
| Netlify | Free/Paid | Very Easy | Excellent | Good |
| Heroku | Free/Paid | Easy | Good | Good |
| Railway | Paid | Easy | Excellent | Good |
| DigitalOcean | $5+/month | Medium | Good | Good |
| AWS | Pay-as-you-go | Hard | Excellent | Excellent |

## 📋 Cost Estimates

### Monthly Costs (Minimum)
- Frontend Hosting: $0-10 (Vercel/Netlify Free)
- Backend Hosting: $5-20 (Railway/Heroku)
- Database: $0-10 (MongoDB Atlas Free Tier)
- Domain: $10-15 (GoDaddy/Namecheap)
- SSL Certificate: $0 (Let's Encrypt)

**Total: $15-55/month**

## ✅ Production Deployment Checklist

### Servers
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] HTTPS/SSL enabled on both
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] Firewall configured

### Code
- [ ] Environment variables set correctly
- [ ] Sensitive data removed from code
- [ ] Error handling in place
- [ ] Logging configured
- [ ] API versioning considered

### Database
- [ ] MongoDB connected
- [ ] Backups automated
- [ ] Indexes created
- [ ] Connection pooling configured

### Security
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] Auth tokens secure
- [ ] Passwords hashed

### Monitoring
- [ ] Uptime monitoring active
- [ ] Error tracking enabled
- [ ] Performance monitoring set up
- [ ] Alerts configured
- [ ] Logs being collected

### Testing
- [ ] Full smoke tests completed
- [ ] Mobile testing done
- [ ] API endpoints verified
- [ ] Authentication tested
- [ ] File uploads working

## 🎯 Next Steps After Deployment

1. Monitor performance metrics
2. Gather user feedback
3. Fix any immediate issues
4. Plan feature rollout
5. Set up analytics
6. Configure backup schedule
7. Create runbook for operations
8. Train team on deployment process

---

**Status**: ✅ READY TO DEPLOY
**Support**: Check README files in both backend and frontend directories
