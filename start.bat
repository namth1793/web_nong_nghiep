@echo off
echo ============================================
echo    AGRIKOLE - Agriculture Landing Page
echo ============================================
echo.
echo Starting server at http://localhost:3000
echo Press Ctrl+C to stop.
echo.

cd /d "%~dp0backend"
node server.js
pause
