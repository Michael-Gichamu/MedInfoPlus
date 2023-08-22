#!/usr/bin/env bash
# Execute the test configuration script
source test_config.sh
printenv | grep MedInfoPlus_ENV

# Run tests
python3 -m unittest tests.test_models.test_base_model
python3 -m unittest tests.test_models.test_medical_article
# Back to development
source dev_config.sh
printenv | grep MedInfoPlus_ENV
