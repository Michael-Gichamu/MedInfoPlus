#!/usr/bin/env bash
# Creates test environment and run unittests.

# Create Backup of the database
./Config_Management/db_backup.sh

# Execute the test configuration script
source Config_Management/test_config.sh
printenv | grep MedInfoPlus_ENV

# Run tests
echo "BaseModel Class Tests"
python3 -m unittest tests.test_models.test_base_model

echo "MedicalArticle Class Tests"
python3 -m unittest tests.test_models.test_medical_article

echo "Resource Class Tests"
python3 -m unittest tests.test_models.test_resource

echo "User Class Tests"
python3 -m unittest tests.test_models.test_user

# Back to development
source Config_Management/dev_config.sh
printenv | grep MedInfoPlus_ENV
