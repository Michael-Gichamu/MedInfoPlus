#!/bin/bash
# User configuration
MYSQL_USER="MedInfoPlus_dev"
MYSQL_PWD="MedInfoPlus_dev_pwd"
MYSQL_DB="MedInfoPlus_dev_db"

# Backup file name with timestamp
BACKUP_FILENAME="backup.sql"

# Check if the backup file exists
if [ ! -f "$BACKUP_FILENAME" ]; then
    echo "Backup file '$BACKUP_FILENAME' not found."
    exit 1
fi

# Restore the database from the backup file
mysql -u "$MYSQL_USER" -p"$MYSQL_PWD" "$MYSQL_DB" < "$BACKUP_FILENAME"

# Check if the restore was successful
if [ $? -eq 0 ]; then
    echo "Database '$MYSQL_DB' restored successfully from '$BACKUP_FILENAME'."
else
    echo "Database restore failed."
fi
