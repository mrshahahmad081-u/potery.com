# Railway Deployment - GitHub Issue Fixed ✅

## What Was Fixed
- All backend and frontend code is now on GitHub in the **`master` branch**
- GitHub repository now contains all 71 files properly
- Previous issue: Railway was seeing an empty repo because backend had its own separate git repo

## Next Steps for Railway Deployment

### Step 1: Update Railway Project (if already created)

If you already have a Railway project created:

1. Go to https://railway.app/dashboard
2. Click on your **potery-backend** project
3. Go to **Settings** → **Project** → **Git Repository**
4. Change the branch from `main` to **`master`**
5. Go to **Settings** → **Build & Deploy**
6. Set the **Root Directory** to `/backend`
7. Click **Redeploy** or trigger a manual deploy

### Step 2: Create New Railway Project (if starting fresh)

If you haven't created the project yet:

1. Go to https://railway.app/dashboard
2. Click **+ New Project**
3. Select **Deploy from GitHub repo**
4. Choose **mrshahahmad081-u/potery.com**
5. Select **master** branch
6. Wait for it to detect the project type (Node.js)
7. Set **Root Directory** to `/backend`
8. Click **Create Project**

### Step 3: Add Environment Variables to Railway

In Railway project settings, add these environment variables:

```
MONGODB_URI=mongodb+srv://mrshahahmad081_db_user:B7Ges5mIoKYbfaUd@potery01.1gmuxxl.mongodb.net/magical_website?retryWrites=true&w=majority

JWT_SECRET=c3f9b1a4e6d7f8a0c2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6

NODE_ENV=production

PORT=5000

FRONTEND_URL=http://localhost:3000

CORS_ORIGIN=http://localhost:3000
```

**Note:** After deploying frontend to Vercel, update `FRONTEND_URL` and `CORS_ORIGIN` with your Vercel domain (e.g., `https://potery-frontend.vercel.app`)

### Step 4: Monitor Deployment

1. Go to **Deployments** tab
2. Wait for the build to complete (usually 3-5 minutes)
3. You'll see a green checkmark when successful
4. Get your backend URL from the **Settings** page
5. It will look like: `https://potery-backend.railway.app`

### Step 5: Test Backend Health

Once deployed, test with:
```
https://potery-backend.railway.app/api/health
```

Should return:
```json
{"status":"Server is running"}
```

---

## GitHub Repository Structure

Your GitHub repo now has this structure:

```
potery.com/
├── backend/           ← This is deployed to Railway
│   ├── server.js
│   ├── auth routes.js
│   ├── user.js
│   ├── middleware.js
│   ├── package.json
│   ├── railway.toml
│   └── .env.example
├── frontend/          ← This will be deployed to Vercel
│   ├── index.html
│   ├── auth.js
│   ├── style.css
│   └── package.json
└── [documentation files]
```

## Troubleshooting

### "Railway still shows empty repo"
- Make sure you're on the **`master` branch** (not `main`)
- Try disconnecting and reconnecting the GitHub repo in Railway settings

### "Build fails with missing packages"
- Check that `backend/package.json` exists (it should)
- Make sure Railway root directory is set to `/backend`

### "Deployment hangs"
- Check your Buildpad logs in Railway dashboard
- Look for any error messages in the **Build logs** tab

---

## Quick Check List

- [ ] GitHub repo has master branch with all code
- [ ] Railroad project is set to `master` branch
- [ ] Root directory is `/backend`
- [ ] Environment variables are added
- [ ] Build completed successfully (green checkmark)
- [ ] Health endpoint returns `{"status":"Server is running"}`

---

**Next:** Once Railway is successful, proceed to deploy frontend to Vercel, then link them together.
