-- prepares a MySQL server for this project

CREATE DATABASE IF NOT EXISTS MedInfoPlus_test_db;
CREATE USER IF NOT EXISTS 'MedInfoPlus_test'@'%' IDENTIFIED BY 'MedInfoPlus_test_pwd';
GRANT ALL PRIVILEGES ON MedInfoPlus_dev_db.* TO 'MedInfoPlus_test'@'localhost';
GRANT SELECT ON performance_schema.* TO 'MedInfoPlus_test'@'localhost';
FLUSH PRIVILEGES;
