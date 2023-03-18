const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config');

let deptArray = [];
let roleArray = [];
let empArray = [];

// Queries to populate Inquirer choices
// Returns all departments currently in the db
db.query('SELECT name FROM department', (err, result) => {
    if (err) {
        console.log(err);
    }
    deptArray.filter(dept => {return dept == ""});
    result.forEach((dept) => {
        deptArray.push(dept.name);
    });
});

// Returns all roles currently in the db
db.query('SELECT title FROM role', (err, result) => {
    if (err) {
        console.log(err);
    }
    roleArray.filter(role => {return role == ""});
    result.forEach((role) => {
        roleArray.push(role.title);
    });
});

// Returns all concat employees currently in the db
db.query('SELECT CONCAT (first_name, " ", last_name) AS name FROM employee', (err, result) => {
    if (err) {
        console.log(err);
    }
    empArray.filter(emp => {return emp == ""});
    result.forEach((emp) => {
        empArray.push(emp.name);
    });
});

// Inquirer questions
const initQuestion = [
    {
        type: 'list',
        name: 'allChoices',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
    },
];

const addDeptQuestions = [
    {
        type: 'input',
        name: 'newDept',
        message: 'What is the name of the department?'
    }
];

const addRoleQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the role?',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
    },
    {
        type: 'list',
        name: 'dept',
        message: 'Which department does the role belong to?',
        choices: deptArray
    }
];

const addEmpQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: roleArray
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: empArray
    }
];

const updateEmpQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Which employee's role do you want to update?",
        choices: empArray
    },
    {
        type: 'input',
        name: 'updatedRole',
        message: "Which role do you want to assign to the selected employee?",
        choices: roleArray
    },
];

// Functions to handle each response type
function viewDept() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log('Viewing all departments.');
        init();
    });
};

function viewRole() {
    db.query('SELECT r.id, r.title, d.name, r.salary FROM role AS r JOIN department AS d ON r.department_id = d.id;', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log('Viewing all roles.');
        init();
    });
};

function viewEmp() {
    db.query('SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT (m.first_name, " ", m.last_name) AS manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id JOIN role AS r ON e.role_id = r.id JOIN department AS d ON r.department_id = d.id;', (err, result) => {
        if (err) {
            console.log(err);
        };
        console.table(result);
        console.log('Viewing all employees.');
        init();
    });
};

function addDept() {
    inquirer
        .prompt(addDeptQuestions)
        .then((answers) => {
            db.query('INSERT INTO department (name) VALUES ( "' + answers.newDept + '" )', (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log('Added ' + answers.newDept + ' to the department database.');
                init();
            })
        });
};

function addRole() {
    inquirer
        .prompt(addRoleQuestions)
        .then((answers) => {
            //INSERT INTO db table (column names) VALUES (values for those columns)
            console.log('Role added.');
            init();
        });
};

function addEmp() {
    inquirer
        .prompt(addEmpQuestions)
        .then((answers) => {
            //INSERT INTO db table (column names) VALUES (values for those columns)
            console.log('Employee added.');
            init();
        });
};

function updateEmp() {
    inquirer
        .prompt(updateEmpQuestions)
        .then((answers) => {
            //UPDATE db table SET role = "[answer]" WHERE id = [emp id]
            console.log('Employee role updated.');
            init();
        });
};

// Function to initialize Inquirer
function init() {
    inquirer
        .prompt(initQuestion)
        .then((answers) => {
            answers = answers.allChoices;
            if (answers === 'View All Departments') {
                viewDept();
            };
            if (answers === 'View All Roles') {
                viewRole();
            };
            if (answers === 'View All Employees') {
                viewEmp();
            };
            if (answers === 'Add a Department') {
                addDept();
            };
            if (answers === 'Add a Role') {
                addRole();
            };
            if (answers === 'Add an Employee') {
                addEmp();
            };
            if (answers === 'Update an Employee Role') {
                updateEmp();
            };
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment.")
            } else {
                console.log("Something else went wrong.")
            }
        })
};

// Function call to initialize app
init();