#!/bin/bash

find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -print0 | 
xargs -0 grep -h "import.*devlink" | 
sed -E "s/.*from[[:space:]]+['\"]([^'\"]+)['\"].*/\1/" | 
sort -u