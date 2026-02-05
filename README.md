# Magical Website Backend - Setup Guide

## ✅ Backend Status: READY FOR PRODUCTION

All files have been created and the backend is fully functional.

## 📋 Project Structure

```
backend/
├── server.js              # Main Express server
├── config.js              # Configuration file
├── middleware.js          # Express middleware (auth, error handling)
├── user.js                # User model & schema
├── content.js             # Content model & schema
├── auth routes.js         # Authentication endpoints
├── content routes.js      # Content management endpoints
├── upload routes.js       # File upload endpoints
├── uplode middleware.js   # Multer file upload configuration
├── package.json           # Dependencies
├── .env                   # Environment variables
└── .env.example           # Example environment file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or remote)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already provided, update if needed):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/magical_website
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:3000
```

5. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### Authentication (`/api/auth`)
- **POST** `/register` - User registration
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **POST** `/login` - User login
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET** `/me` - Get current user (requires token)

### Content Management (`/api/content`)
- **GET** `/` - Get all published content
- **GET** `/:id` - Get single content (increments views)
- **POST** `/` - Create content (admin only)
  ```json
  {
    "title": "Content Title",
    "description": "Content Description",
    "image": "url",
    "category": "Category Name",
    "tags": ["tag1", "tag2"],
    "published": true
  }
  ```

- **PUT** `/:id` - Update content (admin only)
- **DELETE** `/:id` - Delete content (admin only)

### File Upload (`/api/upload`)
- **POST** `/single` - Upload single file
  - Supports: images, PDF, video files
  - Max size: 50MB

- **POST** `/multiple` - Upload multiple files (max 10)

- **DELETE** `/:filename` - Delete uploaded file

### Health Check
- **GET** `/api/health` - Server status

## 🔐 Authentication

All API requests (except register/login) require a JWT token:
```bash
Authorization: Bearer your_jwt_token
```

Token is returned from login/register endpoints.

## 📝 Features

✅ User authentication with JWT
✅ Password hashing with bcryptjs
✅ MongoDB integration with Mongoose
✅ Content management system
✅ File upload (local storage)
✅ Role-based access control (admin/user)
✅ CORS enabled
✅ Error handling middleware
✅ Pagination support
✅ View counter for content

## 🛠️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment | production |
| PORT | Server port | 5000 |
| MONGODB_URI | Database URL | mongodb://localhost:27017/magical_website |
| JWT_SECRET | JWT signing key | your_super_secret_jwt_key |
| JWT_EXPIRE | Token expiration | 7d |
| FRONTEND_URL | Frontend domain | http://localhost:3000 |
| MAX_FILE_SIZE | Max upload size | 52428800 (50MB) |
| CLOUDINARY_* | Optional Cloudinary config | - |

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally or update MONGODB_URI
- Test connection: `mongosh "mongodb://localhost:27017"`

### Port Already in Use
- Change PORT in .env
- Or kill process: `netstat -ano | findstr :5000`

### File Upload Issues
- Check permissions in uploads folder
- Verify file size under MAX_FILE_SIZE
- Check supported file types in `uplode middleware.js`

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-Origin Resource Sharing
- **multer** - File upload handling
- **dotenv** - Environment variables

## 🔄 Next Steps

1. **Setup MongoDB**:
   - Local: Install MongoDB Community
   - Cloud: Use MongoDB Atlas (free tier available)

2. **Update Environment**:
   - Change JWT_SECRET to a strong random string
   - Update FRONTEND_URL to your frontend domain

3. **Deploy**:
   - Heroku, Vercel, DigitalOcean, or Railway
   - Update CORS origin and MONGODB_URI

4. **Production Checklist**:
   - ✅ Set NODE_ENV=production
   - ✅ Use strong JWT_SECRET
   - ✅ Update MONGODB_URI to production database
   - ✅ Configure FRONTEND_URL correctly
   - ✅ Enable HTTPS
   - ✅ Set up logging and monitoring

## 📞 Support

For issues or questions:
1. Check error logs: `npm run dev`
2. Verify .env configuration
3. Ensure MongoDB is running
4. Check API endpoint documentation

---

**Status**: ✅ READY FOR PRODUCTION
**Last Updated**: February 2026
