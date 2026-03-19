@echo off
echo ============================================
echo    AGRIKOLE - Installing Dependencies
echo ============================================
echo.

cd /d "%~dp0backend"
echo [1/2] Installing backend dependencies...
call npm install
echo.

echo ============================================
echo    Installation complete!
echo    Run start.bat to launch the site.
echo ============================================
pause
