#!/usr/bin/bash
# Installation of packages necessary to run the web application.
sudo apt update
sudo apt install python3
sudo apt install python3-pip
sudo apt install pkg-config
sudo apt install libmysqlclient-dev
sudo pip install -r requirements.txt

./Config_Management/dev_config.sh
echo "run: source ~/.bashrc"
