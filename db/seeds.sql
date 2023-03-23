INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Legal"),
       ("Facilities"),
       ("Customer Service"),
       ("Executive Leadership"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 2),
       ("Lawyer", 120000, 4),
       ("Engineer", 90000, 1),
       ("Accountant", 50000, 3),
       ("Junior Engineer", 60000, 1),
       ("Comptroller", 100000, 3),
       ("Customer Service Lead", 75000, 6),
       ("President", 200000, 7),
       ("Database Administrator", 55000, 8),
       ("Chief of Operations", 175000, 7),
       ("Contract Administrator", 80000, 4),
       ("Paralegal", 40000, 4);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, NULL),
       ("Alex", "Rodriguez", 1, NULL),
       ("Sam", "Smith", 1, 2),
       ("Mikayla", "Rowe", 4, 2),
       ("Simon", "Carlisle", 3, NULL),
       ("Carley", "King", 5, 5),
       ("Asher", "Fleming", 5, 5),
       ("Keisha", "Pullman", 12, 1),
       ("Franklin", "Newt", 4, 9),
       ("Finneas", "Buchanan", 6, 11),
       ("Erin", "Parker", 10, NULL);