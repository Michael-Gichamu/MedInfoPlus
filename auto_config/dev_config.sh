#!/usr/bin/env bash
# configure dev user
MedInfoPlus_MYSQL_USER="MedInfoPlus_dev"
MedInfoPlus_MYSQL_PWD="MedInfoPlus_dev_pwd"
MedInfoPlus_MYSQL_HOST="localhost"
MedInfoPlus_MYSQL_DB="MedInfoPlus_dev_db"
MedInfoPlus_ENV="dev"

# Clear any existing MedInfoPlus environment variables section
sed -i '/# MedInfoPlus environment variables/,/^EOT/d' ~/.bashrc

# Add the dev environment section
cat <<EOT >> ~/.bashrc
# MedInfoPlus environment variables
export MedInfoPlus_MYSQL_USER="$MedInfoPlus_MYSQL_USER"
export MedInfoPlus_MYSQL_PWD="$MedInfoPlus_MYSQL_PWD"
export MedInfoPlus_MYSQL_HOST="$MedInfoPlus_MYSQL_HOST"
export MedInfoPlus_MYSQL_DB="$MedInfoPlus_MYSQL_DB"
export MedInfoPlus_ENV="$MedInfoPlus_ENV"
EOT

source ~/.bashrc
echo "MedInfoPlus dev environmental variables"

