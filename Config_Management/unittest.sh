#!/usr/bin/env bash
# Creates test environment and run unittests.

# Create Backup of the database
./Config_Management/db_backup.sh

# Execute the test configuration script
source Config_Management/test_config.sh
printenv | grep MedInfoPlus_ENV

# Setup Database if not exists.
echo "Set Up Test Database"
cat Config_Management/setup_mysql_test.sql | sudo mysql -hlocalhost -uroot -pMedInfoPlus_test_pwd

# Confirm Set Up
echo "Confirmation of Set Up."
echo "SHOW GRANTS FOR 'MedInfoPlus_test'@'localhost';" | sudo mysql -uroot

# Run tests
echo "BaseModel Class Tests"
python3 -m unittest tests.test_models.test_base_model

echo "MedicalArticle Class Tests"
python3 -m unittest tests.test_models.test_medical_article

echo "Resource Class Tests"
python3 -m unittest tests.test_models.test_resource

echo "User Class Tests"
python3 -m unittest tests.test_models.test_user

echo "SavedMedicalArticle Class Tests"
python3 -m unittest tests.test_models.test_saved_medical_article

# Back to development
source Config_Management/dev_config.sh
printenv | grep MedInfoPlus_ENV
