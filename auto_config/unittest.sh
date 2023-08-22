#!/usr/bin/env bash
# Execute the test configuration script
source auto_config/test_config.sh
printenv | grep MedInfoPlus_ENV

# Run tests
echo "BaseModel Class Tests"
python3 -m unittest tests.test_models.test_base_model

echo "MedicalArticle Class Tests"
python3 -m unittest tests.test_models.test_medical_article

echo "Resource Class Tests"
python3 -m unittest tests.test_models.test_resource

# Back to development
source auto_config/dev_config.sh
printenv | grep MedInfoPlus_ENV
