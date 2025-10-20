#!/bin/bash
# Deployment script for theshen.tech/licencetest
# Run this script to prepare files for upload

echo "=== Pakistan Driving License Quiz Deployment ==="
echo "Preparing files for upload to theshen.tech/licencetest"
echo ""

# Create deployment directory
mkdir -p deploy-package

# Copy essential files
echo "Copying files..."
cp index.html deploy-package/
cp style.css deploy-package/
cp script.js deploy-package/
cp GUIDE-FOR-PRACTICAL-DRIVING-TEST.pdf deploy-package/
cp .htaccess deploy-package/
cp README.md deploy-package/

echo "Files copied to deploy-package folder:"
ls -la deploy-package/

echo ""
echo "=== Deployment Instructions ==="
echo "1. Upload all files from 'deploy-package' folder to your server"
echo "2. Place them in: /public_html/licencetest/ (or equivalent path)"
echo "3. Set file permissions: 644 for files, 755 for directories"
echo "4. Test at: https://theshen.tech/licencetest"
echo ""
echo "=== Quick FTP Commands (example) ==="
echo "ftp your-server.com"
echo "cd public_html"
echo "mkdir licencetest"
echo "cd licencetest"
echo "mput deploy-package/*"
echo "chmod 644 *"
echo ""
echo "Deployment package ready!"