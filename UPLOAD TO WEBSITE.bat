@echo off
color 0D
echo.
echo  ============================================
echo    DELIGHT BEAUTY EMPIRE - Website Uploader
echo  ============================================
echo.
echo  Adding your new photos and videos...
echo.

cd /d "C:\Users\SURF\Desktop\DelightBeautyEmpire"

git add assets/images/ assets/videos/

git diff --cached --quiet
if %errorlevel%==0 (
  echo  No new files found.
  echo  Make sure you dropped your photos into the PHOTOS folder
  echo  and your videos into the VIDEOS folder first!
  echo.
  pause
  exit
)

git commit -m "Add new photos and videos"
git push origin main

echo.
echo  ============================================
echo   SUCCESS! Your website has been updated!
echo   Visit: https://Peaceable0909.github.io/delight-beauty-empire
echo  ============================================
echo.
pause
