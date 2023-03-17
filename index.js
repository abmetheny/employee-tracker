const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./config');


// Inquirer questions
const initQuestion = [
    {
        type: 'list',
        name: 'allChoices',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
    },
];

const addDeptQuestions =
{
    type: 'input',
    name: 'newDept',
    message: 'What is the name of the department?'
}

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
        //Replace choices with departments pulled from db
        choices: ['Engineering', 'Finance', 'Legal', 'Sales']
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
        //Replace choices with roles pulled from db
        choices: ['Sales Lead', 'Lawyer', 'Engineer', 'Accountant']
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        //Replace choices with managers pulled from db
        choices: ['John Doe', 'Alex Rodriguez', 'Sam Smith', 'Mikayla Rowe']
    }
];

const updateEmpQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Which employee's role do you want to update?",
        //Replace choices with employees pulled from db
        choices: ['Michael McDonald,', 'Lisa King', 'Eric Clapton', 'Sonya Erickson']
    },
    {
        type: 'input',
        name: 'updatedRole',
        message: "Which role do you want to assign to the selected employee?",
        //Replace choices with roles pulled from db
        choices: ['Sales Lead', 'Lawyer', 'Engineer', 'Accountant']
    },
];

// Functions to handle each response type
function viewDept() {
    //SELECT * db table
    console.log('Viewing all departments.');
    init();
};

function viewRole() {
    //SELECT * db table
    console.log('Viewing all roles.');
    init();
};

function viewEmp() {
    //SELECT * db table
    console.log('Viewing all employees.');
    init();
};

function addDept() {

    inquirer
        .prompt(addDeptQuestions)
        .then((answers) => {
            //INSERT INTO db table (column names) VALUES (values for those columns)
        });
    console.log('Department added.');
    init();
};

function addRole() {
    inquirer
        .prompt(addRoleQuestions)
        .then((answers) => {
            //INSERT INTO db table (column names) VALUES (values for those columns)
        });
    console.log('Role added.');
    init();
};

function addEmp() {
    inquirer
        .prompt(addEmpQuestions)
        .then((answers) => {
            //INSERT INTO db table (column names) VALUES (values for those columns)
        });
    console.log('Employee added.');
    init();
};

function updateEmp() {
    inquirer
        .prompt(updateEmpQuestions)
        .then((answers) => {
            //UPDATE db table SET role = "[answer]" WHERE id = [emp id]
        });
    console.log('Employee role updated.');
    init();
};

// Function to initialize Inquirer
function init() {
    inquirer
        .prompt(initQuestion)
        .then((answers) => {
            console.table(answers)
            answers = answers.allChoices;
            console.log(answers)
            if (answers === 'View All Departments') {
                viewDept();
            };
            if (answers === 'View All Roles') {
                viewRole();
            };
            if (answers === ' View All Employees') {
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