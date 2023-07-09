CREATE DATABASE hms;
USE hms;
CREATE TABLE tenant (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(50) UNIQUE
);

CREATE TABLE landlord (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(50) UNIQUE
);

CREATE TABLE unit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  address VARCHAR(50) UNIQUE NOT NULL,
  landlord_id INT NOT NULL,
  FOREIGN KEY (landlord_id) REFERENCES landlord (id)
);

CREATE TABLE lease (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tenant_id INT NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenant (id),
  unit_id INT NOT NULL,
  FOREIGN KEY (unit_id) REFERENCES unit (id),
  monthly_rental FLOAT(24),
  commencement_date DATE,
  termination_date DATE,
  expiry_date DATE,
  area_in_sq FLOAT(24),
  trade_type VARCHAR(50)
);

CREATE TABLE svc_request (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lease_id INT,
  FOREIGN KEY (lease_id) REFERENCES lease (id),
  submit_time DATETIME,
  closed_time DATETIME,
  status VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  quot_required BOOLEAN NOT NULL,
  quot_amount FLOAT(24),
  quot_accepted BOOLEAN,
  quot_attachment VARCHAR(255),
  feedback INT
);