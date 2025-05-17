#!/bin/bash

# Clean node_modules and install dependencies fresh
rm -rf node_modules package-lock.json
npm cache clean --force

# Install all dependencies
npm install

# Build the application
npm run build

# Ensure proper permissions for all files
find build -type f -exec chmod 644 {} \;
find build -type d -exec chmod 755 {} \;

# Create a _redirects file for single-page application routing
echo "/* /index.html 200" > build/_redirects

# Add a comment to index.html for verification without overwriting
if [ -f build/index.html ]; then
  sed -i '1s/^/<!-- This is a static file served by Render. -->\n/' build/index.html
fi

# Log completion
echo "Build completed successfully!" 