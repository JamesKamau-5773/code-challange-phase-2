#!/bin/bash

echo "=== FIXING GIT REPOSITORY ONCE AND FOR ALL ==="

echo "1. Removing ALL node_modules from Git tracking..."
git rm -rf node_modules 2>/dev/null || true
git rm -rf server/node_modules 2>/dev/null || true
git rm -rf */node_modules 2>/dev/null || true
find . -name "node_modules" -type d -exec git rm -rf {} + 2>/dev/null || true

echo "2. Creating comprehensive .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/
**/node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Build outputs
dist/
build/

# Environment files
.env
.env.local
.env.development
.env.test
.env.production

# Editor files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Vite
.vite/

# Local database
db.json

# Package locks (optional - uncomment if needed)
# package-lock.json
# yarn.lock
EOF

echo "3. Staging changes..."
git add .gitignore
git add -A

echo "4. Committing clean repository..."
git commit -m "Remove node_modules and add comprehensive .gitignore"

echo "5. Attempting to push..."
if git push origin main; then
    echo "✅ SUCCESS: Repository pushed successfully!"
else
    echo "❌ Push failed. Creating clean repository..."
    
    echo "6. Creating orphan branch (clean history)..."
    git checkout --orphan temp-clean
    git add -A
    git commit -m "Clean repository without node_modules"
    
    echo "7. Replacing main branch..."
    git branch -D main
    git branch -m main
    
    echo "8. Force pushing clean repository..."
    git push origin main --force
    
    echo "✅ FIXED: Repository cleaned and pushed with new history!"
fi

echo "=== PROBLEM SOLVED ==="
