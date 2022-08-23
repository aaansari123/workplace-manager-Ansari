
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: 'Codingrules!123',
    database: 'workplace_db'
  },
  console.log(`Connected to the workplace_db database.`)
);

function init(){
    inquirer.prompt(
        {
            type: 'list',
            name: 'selector',
            message: 'What would you like to do',
            choices: ['View all Employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Add Employee', 'Quit']
        }
    )
    .then((answers) => {
        switch(answers.selector){
            case 'View all Employees':
                console.log('test');
                viewAllEmployees();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break; 
            case 'Add Role':
                addRole();
                break; 
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Employee':
                addEmployee();
                break;   
            default:
                console.log('Goodbye');
                break;
        }
    return null;
    })
}
init();
function viewAllEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        init();
      });
}

function viewAllDepartments(){
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init();
      });
}

function viewAllRoles(){
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
        init();
      });
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ])
    .then((answers) => {
        console.log( answers.department);
        db.query('INSERT INTO department (names) VALUES (?)', answers.department,function (err, results) {
            console.table(results);
            init();
          })
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department is it from',
            choices: currentDepartments()
        }
    ])
    .then((answers) => {
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [answers.title, answers.salary, 3], function (err, results) {
            console.table(results);
            init();
          })
    })
}

function currentDepartments(){
    let currentDepartment = [];
    db.query('SELECT DISTINCT(names) FROM department', function (err, results) {
        for(let i = 0; i< results.length; i++){
            currentDepartment.push(results[i].names);
        }
      });
    return currentDepartment;
}
function currentRoles(){
    let currentRoles = [];
    db.query('SELECT DISTINCT(title) FROM roles', function (err, results) {
        for(let i = 0; i< results.length; i++){
            currentRoles.push(results[i].title);
        }
      });
    return currentRoles;
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What is their role',
            choices: currentRoles()
        }
    ])
    .then((answers) => {
        console.log(answers);
        db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [answers.first_name, answers.last_name, 3], function (err, results) {
            console.table(results);
            init();
          })
    })
}

