# 🐙 GITHUB SETUP GUIDE

## STEP 1: CREATE GITHUB ACCOUNT (If Don't Have)
1. Go to https://github.com
2. Click "Sign up"
3. Follow the setup wizard
4. Verify your email

---

## STEP 2: CREATE NEW REPOSITORY

1. Go to https://github.com/new
2. Repository name: `magical-website`
3. Description: "Magical Website with 3D Effects"
4. **Select**: Public (for free)
5. Click "Create repository"
6. **Copy your repository URL**: `https://github.com/YOUR_USERNAME/magical-website.git`

---

## STEP 3: PUSH CODE TO GITHUB

### On Windows (PowerShell or Command Prompt)

```bash
# Navigate to your project folder
cd "C:\Users\Masroor Ahmad\Desktop\fornt back web"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "🚀 Initial commit: Magical Website"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/magical-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### If You Get Authentication Error:

**Option A: Personal Access Token (Recommended)**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo`, `workflow`
4. Click "Generate token"
5. Copy the token
6. When asked for password, paste the token instead

**Option B: SSH Key**
1. Open PowerShell and generate key:
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
# Press Enter 3 times
```
2. Go to https://github.com/settings/ssh/new
3. Paste key from `C:\Users\YOUR_USERNAME\.ssh\id_ed25519.pub`
4. Test: `ssh -T git@github.com`

---

## STEP 4: VERIFY ON GITHUB

1. Refresh https://github.com/YOUR_USERNAME/magical-website
2. You should see all your files
3. Verify these folders are there:
   - `backend/`
   - `frontend/`
   - `.gitignore`
   - `docker-compose.yml`

---

## STEP 5: CREATE .GITIGNORE

Create file: `.gitignore` in root folder with this content:

```
# Dependencies
node_modules/
.npm
package-lock.json

# Environment
.env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*

# Misc
.DS_Store
.vscode/
*.swp
*.swo

# Build
dist/
build/
out/

# IDE
.idea/
.vscode/
*.suo

# OS
Thumbs.db
desktop.ini

# Database
data/
mongodb_data/

# Docker
.dockerignore
```

Then commit:
```bash
git add .gitignore
git commit -m "Add .gitignore"
git push
```

---

## STEP 6: SET UP GITHUB SECRETS (Optional)

If deploying to Railway via GitHub:

1. Go to `https://github.com/YOUR_USERNAME/magical-website/settings/secrets/actions`
2. Click "New repository secret"
3. Add secrets:
   - **JWT_SECRET**: (your 40+ character secret)
   - **MONGODB_URI**: (your MongoDB connection string)
   - **FRONTEND_URL**: (your Vercel frontend URL after deployment)

---

## STEP 7: FUTURE UPDATES

After making changes:

```bash
git add .
git commit -m "Your message here"
git push
```

Railway will automatically redeploy! 🚀

---

## 🔧 TROUBLESHOOTING

### "Authentication failed"
- Check if token/SSH key is correct
- Try: `git config --global credential.helper wincred`

### "Already exists on remote"
- Your code is already on GitHub - you can start deploying!

### "Branch is behind"
- Someone else pushed changes
- Try: `git pull origin main`

### "fatal: not a git repository"
- You're not in the right folder
- Use: `cd "C:\Users\Masroor Ahmad\Desktop\fornt back web"`

---

## ✅ NEXT STEPS

After pushing to GitHub:
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your `magical-website` repository
5. Follow deployment guide in `DEPLOY_NOW.md`

---

🎉 **All set! Your code is now on GitHub and ready to deploy!**
