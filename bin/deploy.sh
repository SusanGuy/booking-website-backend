#!/bin/bash

# Install AWS CLI
apt-get install sudo -y
curl "https://bootstrap.pypa.io/2.6/get-pip.py" -o "get-pip.py" | python
sudo python get-pip.py
pip install awscli --ignore-installed six

# Install "zip"
apt-get update
apt-get install -y zip

# Zip up everything with the exception of node_modules (including dist)
ts=`date +%s`
fn="$EB_APP_NAME-$ts.zip"
find ./ -path '*/node_modules/*' -prune -o -path '*/\.git*' -prune -o -type f -print | S3_KEY="$S3_KEY/$fn"
# Copy the app to S3
aws s3 cp $fn "s3://$S3_BUCKET" --recursive --include "*"

# Create a new version in eb
echo "Creating ElastickBeanstalk Application Version ..."
aws elasticbeanstalk create-application-version \
  --application-name $EB_APP_NAME
  --version-label "$EB_APP_NAME-$ts" \
  --description "$EB_APP_NAME-$ts" \
  --source-bundle S3Bucket="$S3_BUCKET" --auto-create-application

# Update to that version
echo "Updating ElasticBeanstalk Application Version..."
aws elasticbeanstalk update-environment \
  --application-name $EB_APP_NAME \
  --environment-name $EB_APP_ENV \
  --version-label "$EB_APP_NAME-$ts"

echo "Done! Deployed version $EB_APP_NAME-$ts"
