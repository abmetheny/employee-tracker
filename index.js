const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config');

// Variables to populate Inquirer choices
let deptArray = [];
let roleArray = [];
let empArray = [];
let noManager = "None";

// Queries to populate Inquirer choice variables
function getCurrentTables() {
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
        empArray.push(noManager);
        result.forEach((emp) => {
            empArray.push(emp.name);
        });
    });
};

// Create and delete temporary table using employee table names and ids
function createTempMgrTable() {
    db.query(`CREATE TEMPORARY TABLE manager 
    SELECT e.id AS mgr_id, e.first_name AS mgr_fn, e.last_name AS mgr_ln 
    FROM employee e;`, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
};

function deleteTempMgrTable(){
    db.query(`DROP TEMPORARY TABLE manager;`, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
};

// Create and delete temporary table combining employee, role, and department tables
function createTempBudgetTable() {
    db.query(`CREATE TEMPORARY TABLE budget
    SELECT e.role_id, r.id AS role_table_id, r.salary, r.department_id AS role_table_department_id, d.id AS department_table_id, d.name AS department_table_name
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id;`, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
};

function deleteTempBudgetTable(){
    db.query(`DROP TEMPORARY TABLE budget;`, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
};

// Inquirer question arrays
const initQuestion = [
    {
        type: 'list',
        name: 'allChoices',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View Total Utilized Budget of a Department', 'Add a Department', 'Delete a Department', 'View All Roles', 'Add a Role', 'Delete a Role', 'View All Employees', 'View Employees by Manager', 'View Employees by Department', 'Add an Employee', 'Update an Employee Role', 'Update an Employee Manager', 'Delete an Employee']
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

// Functions to handle each response type
function viewDept() {
    db.query(`
    SELECT * 
    FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log('Viewing all departments.');
        init();
    });
};

function viewRole() {
    db.query(`
    SELECT r.id, r.title, d.name AS department, r.salary 
    FROM role AS r 
    LEFT JOIN department AS d 
    ON r.department_id = d.id;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log('Viewing all roles.');
        init();
    });
};

function viewEmp() {
    db.query(`
    SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT (m.first_name, " ", m.last_name) AS manager 
    FROM employee AS e 
    LEFT JOIN employee AS m 
    ON e.manager_id = m.id 
    JOIN role AS r 
    ON e.role_id = r.id 
    JOIN department AS d 
    ON r.department_id = d.id;`, (err, result) => {
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
            // Insert user input value into department table
            db.query(`
            INSERT INTO department (name) 
            VALUES ( "${answers.newDept}" )`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Added ${answers.newDept} department to the database.`);
                init();
            });
        });
};

function addRole() {
    inquirer
        .prompt(addRoleQuestions)
        .then((answers) => {
            // Insert user input values into role table
            db.query(`
            INSERT INTO role (title, salary, department_id)
            SELECT "${answers.name}", ${answers.salary}, d.id
            FROM department d
            WHERE d.name = "${answers.dept}"`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Added ${answers.name} role to the database.`);
                init();
            })
        });
};

function addEmp() {
    inquirer
        .prompt(addEmpQuestions)
        .then((answers) => {
            // Insert user input values into employee table
            if (answers.manager == "None") {
                db.query(`
            INSERT INTO employee (first_name, last_name, role_id)
            SELECT "${answers.firstName}", "${answers.lastName}", r.id
            FROM role r
            WHERE r.title = "${answers.role}"`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Added ${answers.firstName} ${answers.lastName} to the employee database.`);
                init();
            });  
            }
            else {db.query(`
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            SELECT "${answers.firstName}", "${answers.lastName}", r.id, e.id
            FROM role r, employee e
            WHERE r.title = "${answers.role}"
            AND CONCAT (e.first_name, " ", e.last_name) = "${answers.manager}"`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Added ${answers.firstName} ${answers.lastName} to the employee database.`);
                init();
            });
            }  
        });
};

function updateEmp() {
    inquirer
        .prompt(updateEmpQuestions)
        .then((answers) => {
            // Update employee table with user input values
            db.query(`UPDATE employee e
            SET role_id = (SELECT id FROM role WHERE title = '${answers.updatedRole}')
            WHERE CONCAT (e.first_name, ' ', e.last_name) = '${answers.name}';`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`Employee role updated.`);
                init();
            });
        });
};

function updateEmpMgr() {
    inquirer
        .prompt(updateEmpMgrQuestions)
        .then((answers) => {
            createTempMgrTable();
            // Update employee table with user input values
            db.query(`UPDATE employee e JOIN manager m ON CONCAT (m.mgr_fn, ' ', m.mgr_ln) = '${answers.updatedMgr}' SET e.manager_id = m.mgr_id WHERE CONCAT (e.first_name, ' ', e.last_name) = '${answers.name}';`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                deleteTempMgrTable();
                console.log(`Employee manager updated.`);
                init();
            });
        });
};

function viewEmpMgr() {
    db.query(`SELECT CONCAT (e.first_name, ' ', e.last_name) AS employee, CONCAT (m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN employee m ON e.manager_id = m.id
    ORDER BY m.first_name;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log('Viewing all employees by manager.');
        init();
    });
};

function viewEmpDept() {
    db.query(`SELECT CONCAT (e.first_name, ' ', e.last_name) AS employee, d.name AS department
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    ORDER BY d.name;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log('Viewing all employees by department.');
        init();
    });
};

function deleteDept() {
    inquirer
        .prompt(deleteDeptQuestions)
        .then((answers) => {
            // Delete user selected department from department table
            db.query(`DELETE FROM department WHERE name = '${answers.dept}';`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`${answers.dept} deleted from departments list.`);
                init();
            });          
        });
};

function deleteRole() {
    inquirer
        .prompt(deleteRoleQuestions)
        .then((answers) => {
            // Delete user selected role from role table
            db.query(`DELETE FROM role WHERE title = '${answers.role}';`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`${answers.role} deleted from roles list.`);
                init();
            });      
        });
};

function deleteEmp() {
    inquirer
        .prompt(deleteEmpQuestions)
        .then((answers) => {
            // Delete user selected employee from employee table
            db.query(`DELETE FROM employee WHERE CONCAT (first_name, ' ', last_name) = '${answers.name}';`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`${answers.name} removed from employees list.`);
                init();
            });             
        });  
};

function viewBudget() {
    inquirer
        .prompt(viewBudgetQuestions)
        .then((answers) => {
            createTempBudgetTable();
            // View sum of salaries for all employees within user selected department
            db.query(`SELECT SUM(salary) AS total_dept_budget
            FROM budget
            WHERE department_table_name = '${answers.dept}';`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                deleteTempBudgetTable();
                console.table(result);
                console.log(`Viewing total utilized budget for ${answers.dept} department.`);
                init();
            });
        });
};

// Function to initialize Inquirer
init = async () => {
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
            if (answers === 'Delete a Department') {
                deleteDept();
            };
            if (answers === 'Delete a Role') {
                deleteRole();
            };
            if (answers === 'Delete an Employee') {
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