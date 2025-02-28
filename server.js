const express = require('express');
// const inquirer = require('inquirer');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    // Enter PostgreSQL username
    user: 'postgres',
    //  Enter PostgreSQL password
    password: '',
    host: 'localhost',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
)

pool.connect();


app.get('/', (req, res) => 
    res.send('<p>Please initiate the Inquirer</p>')
);

// View Departments
app.get('/api/departments', (req, res) => {
  const sql = `SELECT * FROM department;`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(rows)
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// View Roles
// This query joins the role and department tables to display the job title, role ID, salary, and department name
app.get('/api/roles', (req, res) => {
  const sql = `SELECT * FROM role;`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(rows)
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// View Employeees
// This query joins the employee, role, and department tables to display the employee's first name, last name, job title, department, salary, and manager ID
// SELECT * FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id;
app.get('/api/employees', (req, res) => {
  const sql = `SELECT * FROM employee;`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(rows)
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Add Department
// This route adds a new department to the department table
app.post('/api/add-department', (req, res) => {
	const {name} = req.body;

	if (name) {
		pool.query(`INSERT INTO department (name) VALUES ($1)`, [name], (err, { rows }) => {
			if (err) {
				console.log(err);
			}
			console.log('Added a new department')
			res.json({
				message: 'success',
				data: 'A new department was added to the "department" table'
			});
		});
	} else {
		res.status(500).json('Error in adding department')
	};
});

// Add Role
// This route adds a new role to the role table
app.post('/api/add-role', (req, res) => {
	const {title, salary, department_id} = req.body;

	if (title && salary && department_id) {
		pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [title, salary, department_id], (err, { rows }) => {
			if (err) {
				console.log(err);
			}
			console.log('Added a new role')
			res.json({
				message: 'success',
				data: 'A new role was added to the "role" table'
			});
		});
	} else {
		res.status(500).json('Error in adding role')
	};
});

// Add employee
// This route adds a new employee to the employee table
app.post('/api/add-employee', (req, res) => {
	const {first_name, last_name, role_id, manager_id} = req.body;
	const values = [first_name, last_name, role_id]

	if (first_name && last_name && role_id ) { // manager_id can be null
		if (manager_id === null) {
			const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, NULL)`; // if const declared here, inaccessible in query due to block scope
			console.log(sql);
			pool.query(sql, values, (err, { rows }) => {
				if (err) {
					console.log(err);
				}
				console.log('Added a new employee')
				res.json({
					message: 'success',
					data: 'A new employee without a manager was added to the "employee" table'
				});
			}); 
		} else {
			const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
			values.push(manager_id); 
			console.log(sql);
			pool.query(sql, values, (err, { rows }) => {
				if (err) {
					console.log(err);
				}
				console.log('Added a new employee')
				res.json({
					message: 'success',
					data: 'A new employee with a manager was added to the "employee" table'
				});
			});
		
		};
	} else {
		res.status(500).json('Error in adding employee')
	};
});

// Update an Employee's Role
// This route updates an employee's role in the employee table
app.post('/api/update-employee-role', (req, res) => {
	const {employee_id, role_id} = req.body;

	if (employee_id && role_id) {
		pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [role_id, employee_id], (err, {rows}) => {
			if (err) {
				console.log(err);
			}
			console.log("Updated an employee's role")
			res.json({
				message: 'success',
				data: "Updated an employee's role"
			});
		});
	} else {
		res.status(500).json("Error in updating an employee's role")
	};
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


