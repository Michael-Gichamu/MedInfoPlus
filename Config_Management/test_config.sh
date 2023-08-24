#!/usr/bin/bash
# configuration for test user
export MedInfoPlus_MYSQL_USER="MedInfoPlus_test"
export MedInfoPlus_MYSQL_PWD="MedInfoPlus_test_pwd"
export MedInfoPlus_MYSQL_HOST="localhost"
export MedInfoPlus_MYSQL_DB="MedInfoPlus_test_db"
export MedInfoPlus_ENV="test"

# Clear any existing MedInfoPlus environment variables section
sed -i '/# MedInfoPlus environment variables/,/^EOT/d' ~/.bashrc

# Add the test environment section
cat <<EOT >> ~/.bashrc
# MedInfoPlus environment variables
export MedInfoPlus_MYSQL_USER="$MedInfoPlus_MYSQL_USER"
export MedInfoPlus_MYSQL_PWD="$MedInfoPlus_MYSQL_PWD"
export MedInfoPlus_MYSQL_HOST="$MedInfoPlus_MYSQL_HOST"
export MedInfoPlus_MYSQL_DB="$MedInfoPlus_MYSQL_DB"
export MedInfoPlus_ENV="$MedInfoPlus_ENV"
EOT

source ~/.bashrc
echo "MedInfoPlus test environmental variables"

