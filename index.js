const inquirer = require('inquirer');

// Initial question to determine which data user wants to see or manipulate
const initQuestion = 
    {
        type: 'list',
        name: 'viewAll',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', ' View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
    };

// Functions to handle each response type
function viewDept () {
    console.log('Viewing all departments.')
};

function viewRole () {
    console.log('Viewing all roles.')
};

function viewEmp () {
    console.log('Viewing all employees.')
};

function addDept () {
    console.log('Department added.')
};

function addRole () {
    console.log('Role added.')
};

function addEmp () {
    console.log('Employee added.')
};

function updateEmp () {
    console.log('Employee role updated.')
};

// Function to initialize Inquirer
function init() {
    inquirer
        .prompt(initQuestion)
        .then((answers) => {
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