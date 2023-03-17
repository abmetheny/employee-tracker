--View All Departments query
SELECT * 
FROM department;

--View All Roles query
SELECT r.id, r.title, d.name, r.salary 
FROM role AS r
JOIN department AS d ON r.department_id = d.id;

--View All Employees query
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT (m.first_name, ' ', m.last_name) AS manager
FROM employee AS e
LEFT JOIN employee AS m ON e.manager_id = m.id
JOIN role AS r ON e.role_id = r.id
JOIN department AS d ON r.department_id = d.id;

--Add a Department query


--Add a Role query


--Update and Employee Role query
