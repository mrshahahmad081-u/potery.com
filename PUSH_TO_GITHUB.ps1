# ========================================
# 🚀 PUSH CODE TO GITHUB
# ========================================
# This script will push your entire project to GitHub

Write-Host "================================" -ForegroundColor Cyan
Write-Host "📤 PUSHING CODE TO GITHUB" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Ask for GitHub username
$username = Read-Host "Enter your GitHub username"
$repoName = "magical-website"

if ($username -eq "") {
    Write-Host "❌ GitHub username cannot be empty!" -ForegroundColor Red
    exit 1
}

# Set the GitHub repo URL
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "🔗 Repository URL: $repoUrl" -ForegroundColor Yellow
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Install from: https://git-scm.com" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Initialize git if not already done
if (!(Test-Path ".git")) {
    Write-Host "📝 Initializing git repository..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "📂 Adding all files..." -ForegroundColor Cyan
git add .
Write-Host "✅ Files added" -ForegroundColor Green

Write-Host ""
Write-Host "💾 Creating initial commit..." -ForegroundColor Cyan
git commit -m "🚀 Initial commit: Magical Website - Full Stack Application"
Write-Host "✅ Commit created" -ForegroundColor Green

Write-Host ""
Write-Host "🔗 Adding GitHub remote..." -ForegroundColor Cyan
git remote add origin $repoUrl -ErrorAction SilentlyContinue
Write-Host "✅ Remote added" -ForegroundColor Green

Write-Host ""
Write-Host "🌿 Setting branch to main..." -ForegroundColor Cyan
git branch -M main
Write-Host "✅ Branch set to main" -ForegroundColor Green

Write-Host ""
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📌 If prompted for authentication:" -ForegroundColor Yellow
Write-Host "   • Username: $username" -ForegroundColor Yellow
Write-Host "   • Password: Use Personal Access Token (NOT your password)" -ForegroundColor Yellow
Write-Host "   • Get token: https://github.com/settings/tokens" -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "✅ SUCCESS! CODE PUSHED TO GITHUB" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Your repository is ready at:" -ForegroundColor Green
    Write-Host "https://github.com/$username/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📌 Next steps:" -ForegroundColor Green
    Write-Host "1. Go to https://railway.app" -ForegroundColor White
    Write-Host "2. Create account (or login with GitHub)" -ForegroundColor White
    Write-Host "3. Deploy from GitHub" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try these fixes:" -ForegroundColor Yellow
    Write-Host "1. Check GitHub username is correct" -ForegroundColor White
    Write-Host "2. Check repo exists on GitHub" -ForegroundColor White
    Write-Host "3. Use Personal Access Token (not password)" -ForegroundColor White
    Write-Host "   Token: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host ""
}
