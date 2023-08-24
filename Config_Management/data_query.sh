#!/bin/bash
# User configuration
MYSQL_USER="MedInfoPlus_dev"
MYSQL_PWD="MedInfoPlus_dev_pwd"
MYSQL_DB="MedInfoPlus_dev_db"

# Check if the query argument is provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 <SQL Query>"
  exit 1
fi

QUERY="$1"

# Run the SQL query using the provided arguments
echo "$QUERY" | \
mysql -u"$MYSQL_USER" -p"$MYSQL_PWD" -hlocalhost "$MYSQL_DB"
