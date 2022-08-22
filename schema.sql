DROP DATABASE IF EXISTS workplace_db;
CREATE DATABASE workplace_db;

USE workplace_db;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL
);
