#!/bin/bash
# User configuration
MYSQL_USER="MedInfoPlus_dev"
MYSQL_PWD="MedInfoPlus_dev_pwd"
MYSQL_DB="MedInfoPlus_dev_db"

# Backup file name with timestamp
BACKUP_FILENAME="backup.sql"

MYSQLDUMP_PATH=$(which mysqldump)

$MYSQLDUMP_PATH -u $MYSQL_USER -p$MYSQL_PWD $MYSQL_DB > $BACKUP_FILENAME

# Check if the backup was successful
if [ $? -eq 0 ]; then
    echo "Backup completed successfully. File: $BACKUP_FILENAME"
else
    echo "Backup failed."
fi
