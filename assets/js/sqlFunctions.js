const db = require('../../config');
const cTable = require('console.table');
const { init } = require('../../indexCOPY.js');
const { createTempMgrTable, deleteTempMgrTable, createTempBudgetTable, deleteTempBudgetTable } = require('./inquirerFunctions');

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

function viewEmpDept() {
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
            // Update employee table with user input values
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

module.exports = viewDept;
module.exports = viewRole;
module.exports = viewEmp;
module.exports = addDept;
module.exports = addRole;
module.exports = addEmp;
module.exports = updateEmp;
module.exports = updateEmpMgr;
module.exports = viewEmpMgr;
module.exports = viewEmpDept;
module.exports = deleteDept;
module.exports = deleteRole;
module.exports = deleteEmp;
module.exports = viewBudget;