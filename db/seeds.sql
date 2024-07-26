INSERT INTO department (name) -- Do not have to include id which is SERIAL
VALUES 	('Marketing'),
		('Sales'),
		('Information Technology'),
		('Customer Service'),
		('Human Resources');

-- role TABLE
INSERT INTO role (title, salary, department_id)
VALUES 	('Lawyer', 100000, 1),
        ('Salesperson', 50000, 2),
        ('Software Engineer', 80000, 3),
        ('Customer Service Representative', 40000, 4),
        ('Human Resources Manager', 70000, 5),
        ('Marketing Specialist', 60000, 1),
        ('IT Manager', 90000, 3);
        

-- employee TABLE
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES	('Mike', 'Chan', 1, NULL),
        ('Ashley', 'Rodriguez', 2, 1),
        ('Kevin', 'Tupik', 3, 1),
        ('Malia', 'Brown', 4, 2),
        ('Sarah', 'Lourd', 5, 3),
        ('Tom', 'Allen', 6, 1),
        ('Kunal', 'Singn', 7, 3);
		