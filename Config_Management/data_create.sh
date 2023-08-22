#!/bin/bash
# user values configuration.
MYSQL_USER="MedInfoPlus_dev"
MYSQL_PWD="MedInfoPlus_dev_pwd"
MYSQL_HOST="localhost"
MYSQL_DB="MedInfoPlus_dev_db"

# Check if the required arguments are provided
if [ $# -lt 2 ]; then
  echo "Usage: $0 <ClassName> <Arguments>"
  exit 1
fi

CLASS_NAME="$1"
shift
ARGUMENTS="$@"

# Validate arguments based on the class
function validate_arguments {
  local arg_str="$1"

  if [ "$CLASS_NAME" == "Resource" ]; then
    if [[ ! "$arg_str" =~ ^name= ]]; then
      echo "Error: Missing or invalid arguments for Resource class."
      exit 1
    fi
  elif [ "$CLASS_NAME" == "MedicalArticle" ]; then
    if [[ ! "$arg_str" =~ ^title= || ! "$arg_str" =~ category= || ! "$arg_str" =~ resource_Id= ]]; then
      echo "Error: Missing or invalid arguments for MedicalArticle class."
      exit 1
    fi
  else
    echo "Error: Invalid class name."
    exit 1
  fi
}

# Run the command using provided arguments
validate_arguments "$ARGUMENTS"
echo "create $CLASS_NAME $ARGUMENTS" | \
MedInfoPlus_MYSQL_USER="$MYSQL_USER" \
MedInfoPlus_MYSQL_PWD="$MYSQL_PWD" \
MedInfoPlus_MYSQL_HOST="$MYSQL_HOST" \
MedInfoPlus_MYSQL_DB="$MYSQL_DB" \
./console.py

