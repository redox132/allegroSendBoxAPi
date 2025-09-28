#!/bin/bash
# A helper script to push changes to Git

# Ensure a commit message is provided
if [ -z "$1" ]; then
  echo "Usage: ./git_push_helper.sh \"Your commit message\""
  exit 1
fi

echo "Checking out to dev..."
git checkout dev

echo "Adding all files..."
git add .

echo "Committing changes..."
git commit -m "$1"

echo "Pushing dev..."
git push

echo "Checking out to main..."
git checkout main

echo "Merging dev into main..."
git merge dev

echo "Pushing main..."
git push

echo "Switching back to dev to continue coding..."
git checkout dev
