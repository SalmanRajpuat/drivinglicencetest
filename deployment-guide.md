# Deployment Guide for theshen.tech/licencetest

## Files to Upload
Upload these files to your web server in the `/licencetest` directory:

### Required Files:
- `index.html` (main page)
- `style.css` (styles)
- `script.js` (functionality)
- `GUIDE-FOR-PRACTICAL-DRIVING-TEST.pdf` (study guide)
- `README.md` (documentation - optional)

### Optional Files:
- `quiz_page.html` (original downloaded page - can be skipped)

## Deployment Options

### Option 1: FTP/SFTP Upload (Recommended)
1. Connect to your hosting provider's FTP/SFTP
2. Navigate to your domain's public folder (usually `public_html` or `www`)
3. Create a `licencetest` folder
4. Upload all required files to this folder
5. Set proper permissions (644 for files, 755 for folders)

### Option 2: cPanel File Manager
1. Log into your hosting cPanel
2. Open File Manager
3. Navigate to `public_html`
4. Create `licencetest` folder
5. Upload files via the upload feature

### Option 3: Git Deployment (if supported)
1. Initialize git repository
2. Add remote origin to your hosting git repository
3. Push files to deploy

## Server Configuration

### .htaccess (for Apache servers)
Create this file in the licencetest folder for better performance:

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 week"
</IfModule>

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

## Post-Deployment Checklist
- [ ] Test main page: https://theshen.tech/licencetest
- [ ] Test quiz functionality
- [ ] Test PDF download
- [ ] Test responsive design on mobile
- [ ] Check all external links work
- [ ] Verify fast loading times

## Domain Configuration
Make sure your domain DNS is properly configured:
- A record pointing to your server IP
- CNAME for www (if needed)
- SSL certificate installed for HTTPS

## Performance Optimization
- Enable gzip compression
- Set proper cache headers
- Optimize images (none currently used)
- Consider CDN for static assets

## Backup Strategy
- Keep local copy of all files
- Regular backups of the live site
- Version control with git (recommended)