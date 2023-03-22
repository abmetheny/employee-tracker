const { deptArray, roleArray, empArray } = require('./inquirerFunctions');

// Inquirer questions
const initQuestion = [
    {
        type: 'list',
        name: 'allChoices',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Update an Employee Manager', 'View Employees by Manager', 'View Employees by Department', 'Delete Departments', 'Delete Roles', 'Delete Employees', 'View Total Utilized Budget of a Department']
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
        type: 'list',
        name: 'name',
        message: "Which employee's role do you want to update?",
        choices: empArray
    },
    {
        type: 'list',
        name: 'updatedRole',
        message: "Which role do you want to assign to the selected employee?",
        choices: roleArray
    },
];

const updateEmpMgrQuestions = [
    {
        type: 'list',
        name: 'name',
        message: "Which employee's manager do you want to update?",
        choices: empArray
    },
    {
        type: 'list',
        name: 'updatedMgr',
        message: "Which manager do you want to assign to the selected employee?",
        choices: empArray
    },
];

const viewEmpMgrQuestions = [
    {
        type: 'list',
        name: 'mgrName',
        message: "Which manager's employees do you want to view?",
        choices: ['Jim', 'Alex'] //mgrArray
    },
];

const viewEmpDeptQuestions = [
    {
        type: 'list',
        name: 'dept',
        message: "Which department's employees do you want to view?",
        choices: deptArray
    },
];

const deleteDeptQuestions = [
    {
        type: 'list',
        name: 'dept',
        message: "Which department do you want to delete?",
        choices: deptArray
    },
];

const deleteRoleQuestions = [
    {
        type: 'list',
        name: 'role',
        message: "Which role do you want to delete?",
        choices: roleArray
    },
];

const deleteEmpQuestions = [
    {
        type: 'list',
        name: 'name',
        message: "Which employee do you want to delete?",
        choices: empArray
    },
];

const viewBudgetQuestions = [
    {
        type: 'list',
        name: 'dept',
        message: "Which department's budget do you want to view?",
        choices: deptArray
    },
]

module.exports = { initQuestion, addDeptQuestions, addRoleQuestions, addEmpQuestions, updateEmpQuestions, updateEmpMgrQuestions, viewEmpMgrQuestions, viewEmpDeptQuestions, deleteDeptQuestions, deleteRoleQuestions, deleteRoleQuestions, viewBudgetQuestions };