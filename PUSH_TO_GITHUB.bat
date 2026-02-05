@echo off
REM ========================================
REM 🚀 PUSH CODE TO GITHUB (Command Prompt)
REM ========================================

echo.
echo ================================
echo 📤 PUSHING CODE TO GITHUB
echo ================================
echo.

REM Ask for GitHub username
set /p username=Enter your GitHub username: 

if "%username%"=="" (
    echo ❌ GitHub username cannot be empty!
    exit /b 1
)

set repoName=magical-website
set repoUrl=https://github.com/%username%/%repoName%.git

echo.
echo 🔗 Repository URL: %repoUrl%
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed!
    echo Install from: https://git-scm.com
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Initialize git if not already done
if not exist ".git" (
    echo 📝 Initializing git repository...
    git init
    echo ✅ Git initialized
) else (
    echo ✅ Git repository already exists
)

echo.
echo 📂 Adding all files...
git add .
echo ✅ Files added
echo.

echo 💾 Creating initial commit...
git commit -m "🚀 Initial commit: Magical Website - Full Stack Application"
echo ✅ Commit created
echo.

echo 🔗 Adding GitHub remote...
git remote add origin %repoUrl% 2>nul
echo ✅ Remote added
echo.

echo 🌿 Setting branch to main...
git branch -M main
echo ✅ Branch set to main
echo.

echo ⬆️  Pushing to GitHub...
echo.
echo 📌 If prompted for authentication:
echo    • Username: %username%
echo    • Password: Use Personal Access Token (NOT your password)
echo    • Get token: https://github.com/settings/tokens
echo.

git push -u origin main

if errorlevel 0 (
    echo.
    echo ================================
    echo ✅ SUCCESS! CODE PUSHED TO GITHUB
    echo ================================
    echo.
    echo 🎉 Your repository is ready at:
    echo https://github.com/%username%/%repoName%
    echo.
    echo 📌 Next steps:
    echo 1. Go to https://railway.app
    echo 2. Create account (or login with GitHub)
    echo 3. Deploy from GitHub
    echo.
) else (
    echo.
    echo ❌ Push failed!
    echo.
    echo Try these fixes:
    echo 1. Check GitHub username is correct
    echo 2. Check repo exists on GitHub
    echo 3. Use Personal Access Token (not password)
    echo    Token: https://github.com/settings/tokens
    echo.
)
