@echo off
echo ============================================
echo    THE PERLA VIET NAM
echo ============================================
echo.
echo Starting website at http://localhost:3000
echo Press Ctrl+C to stop.
echo.

cd /d "%~dp0backend"
node server.js
pause
