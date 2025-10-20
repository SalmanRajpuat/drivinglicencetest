@echo off
REM Deployment script for theshen.tech/licencetest
REM Run this script to prepare files for upload

echo === Pakistan Driving License Quiz Deployment ===
echo Preparing files for upload to theshen.tech/licencetest
echo.

REM Create deployment directory
if not exist "deploy-package" mkdir deploy-package

REM Copy essential files
echo Copying files...
copy index.html deploy-package\
copy style.css deploy-package\
copy script.js deploy-package\
copy GUIDE-FOR-PRACTICAL-DRIVING-TEST.pdf deploy-package\
copy .htaccess deploy-package\
copy README.md deploy-package\

echo.
echo Files copied to deploy-package folder:
dir deploy-package\

echo.
echo === Deployment Instructions ===
echo 1. Upload all files from 'deploy-package' folder to your server
echo 2. Place them in: /public_html/licencetest/ (or equivalent path)
echo 3. Set file permissions: 644 for files, 755 for directories  
echo 4. Test at: https://theshen.tech/licencetest
echo.
echo === Using FileZilla or WinSCP ===
echo 1. Connect to your hosting FTP/SFTP
echo 2. Navigate to public_html or www folder
echo 3. Create 'licencetest' folder
echo 4. Upload all files from deploy-package folder
echo 5. Set proper permissions if needed
echo.
echo Deployment package ready!
pause