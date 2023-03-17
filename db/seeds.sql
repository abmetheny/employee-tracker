INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 2),
       ("Lawyer", 120000, 4),
       ("Engineer", 90000, 1),
       ("Accountant", 50000, 3),
       ("Junior Engineer", 60000, 1),
       ("Comptroller", 100000, 3),
       ("Marketing Specialist", 75000, 2);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, 3),
       ("Alex", "Rodriguez", 1, NULL),
       ("Sam", "Smith", 1, 3),
       ("Mikayla", "Rowe", 4, 3),
       ("Erin", "Parker", 3, 3);