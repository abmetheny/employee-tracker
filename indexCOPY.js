const inquirer = require('inquirer');
const initQuestion = require('./assets/js/inquirerQuestions');
const getCurrentTables = require('./assets/js/inquirerFunctions');
const viewDept = require('./assets/js/sqlFunctions');
const viewRole = require('./assets/js/sqlFunctions');
const viewEmp = require('./assets/js/sqlFunctions');
const addDept = require('./assets/js/sqlFunctions');
const addRole = require('./assets/js/sqlFunctions');
const addEmp = require('./assets/js/sqlFunctions');
const updateEmp = require('./assets/js/sqlFunctions');
const updateEmpMgr = require('./assets/js/sqlFunctions');
const viewEmpMgr = require('./assets/js/sqlFunctions');
const viewEmpDept = require('./assets/js/sqlFunctions');
const deleteDept = require('./assets/js/sqlFunctions');
const deleteRole = require('./assets/js/sqlFunctions');
const deleteEmp = require('./assets/js/sqlFunctions');
const viewBudget = require('./assets/js/sqlFunctions');

// Function to initialize Inquirer
const init = async () => {
    // Awaits for arrays supplying Inquirer choices to be updated before initializing prompts
    await getCurrentTables();
    
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
            if (answers === 'Update an Employee Manager') {
                updateEmpMgr();
            };
            if (answers === 'View Employees by Manager') {
                viewEmpMgr();
            };
            if (answers === 'View Employees by Department') {
                viewEmpDept();
            };
            if (answers === 'Delete Departments') {
                deleteDept();
            };
            if (answers === 'Delete Roles') {
                deleteRole();
            };
            if (answers === 'Delete Employees') {
                deleteEmp();
            };
            if (answers === 'View Total Utilized Budget of a Department') {
                viewBudget();
            }
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

module.exports = init;