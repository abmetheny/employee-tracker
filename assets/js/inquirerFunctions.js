const db = require('../../config');

let deptArray = [];
let roleArray = [];
let empArray = [];
let noManager = "None";

// Queries to populate Inquirer choices
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


module.exports = { deptArray, roleArray, empArray };


module.exports = getCurrentTables;
module.exports = createTempMgrTable;
module.exports = deleteTempMgrTable;
module.exports = createTempBudgetTable;
module.exports = deleteTempBudgetTable;