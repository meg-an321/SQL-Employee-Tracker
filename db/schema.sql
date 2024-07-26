-- The company_db database will have three tables: department, role, and employee.
DROP DATABASE IF EXISTS company_db;
-- Create the company_db database
CREATE DATABASE company_db;

-- Connect to the company_db database
\c company_db;

CREATE TABLE department (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
	id SERIAL PRIMARY KEY,
	title VARCHAR(30) UNIQUE NOT NULL, 
	salary DECIMAL NOT NULL,
	department_id INTEGER NOT NULL,
	FOREIGN KEY (department_id) -- department_id is a foreign key that references the id column in the department table (*schema*)
    REFERENCES department(id)
	ON DELETE SET NULL 
);

CREATE TABLE employee (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INTEGER NOT NULL,
	FOREIGN KEY (role_id) -- role_id is a foreign key that references the id column in the role table (*schema*)
	REFERENCES role(id)
	ON DELETE SET NULL, 
	manager_id INTEGER,
	FOREIGN KEY (manager_id) 
	REFERENCES employee(id) -- manager_id is a foreign key that references the id column in the employee table (schema)
	ON DELETE SET NULL 
);