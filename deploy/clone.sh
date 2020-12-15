#!/bin/bash

# Set paths
DEPLOY_DIR=/home/alex/projects/tmpdeploy

# Set error to file
command 2> $DEPLOY_DIR/error.log

# Pull project repo
echo "Cloning to "$DEPLOY_DIR" repo link "$1
cd $DEPLOY_DIR
git clone $1 $2

echo "Cloned successfully"
sleep 3

echo "Running script"

# build frontend
# cd $FRONTEND_DIR
# npm run build

timestamp=$(date +'%Y-%m-%d %X')

echo  '' >> $DEPLOY_DIR/process.log
echo 'DEPLOYED on  (script):'$timestamp >> $DEPLOY_DIR/process.log

exit $?