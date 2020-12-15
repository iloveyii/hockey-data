#!/bin/bash

# Set paths
PROJECT_DIR=/home/ubuntu/projects/dev/mobile-platforms-dt581b-project
DEPLOY_DIR=/home/ubuntu/projects/dev/mobile-platforms-dt581b-project/deploy
BACKEND_DIR=/home/ubuntu/projects/dev/mobile-platforms-dt581b-project/backend
FRONTEND_DIR=/home/ubuntu/projects/dev/mobile-platforms-dt581b-project/frontend

# Set error to file
command 2> $DEPLOY_DIR/error.log

# Pull project repo
cd $PROJECT_DIR
git stash
git pull

# build frontend
cd $FRONTEND_DIR
npm run build

timestamp=$(date +'%Y-%m-%d %X')

echo  '' >> $DEPLOY_DIR/process.log
echo 'PROJECT (script):'$timestamp >> $DEPLOY_DIR/process.log

exit $?