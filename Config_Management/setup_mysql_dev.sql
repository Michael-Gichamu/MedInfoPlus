-- prepares a MySQL server for this project

CREATE DATABASE IF NOT EXISTS MedInfoPlus_dev_db;
CREATE USER IF NOT EXISTS 'MedInfoPlus_dev'@'localhost' IDENTIFIED BY 'MedInfoPlus_dev_pwd';
GRANT ALL PRIVILEGES ON MedInfoPlus_dev_db.* TO 'MedInfoPlus_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'MedInfoPlus_dev'@'localhost';
FLUSH PRIVILEGES;
