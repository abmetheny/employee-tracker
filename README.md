# employee-tracker
Content Management System (CMS) interface to allow non-developers to easily view and interact with information stored in databases.

## User Story
AS A business owner  
I WANT to be able to view and manage the departments, roles, and employees in my company  
SO THAT I can organize and plan my business  

## Acceptance Criteria
GIVEN a command-line application that accepts user input  
WHEN I start the application  
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role  
WHEN I choose to view all departments  
THEN I am presented with a formatted table showing department names and department ids  
WHEN I choose to view all roles  
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role  
WHEN I choose to view all employees  
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to  
WHEN I choose to add a department  
THEN I am prompted to enter the name of the department and that department is added to the database  
WHEN I choose to add a role  
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database  
WHEN I choose to add an employee  
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database  
WHEN I choose to update an employee role  
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Description of Work Performed
* Used Inquirer package to allow user interface with terminal, MySQL to store and alter databse based on user input, and console.table to display database tables
* Wrote questions for users to answer in the command-line application
* Wrote JavaScript functions to query the MySQL database to populate some Inquirer choices
* Answers to command-line questions are passed into JavaScript functions to query the MySql database to perform the following:
  * View all departments, roles, and employees in the database
  * Add departments, roles, and employees to the database
  * Update the role or manager assigned to an employee
  * View employees sorted by manager or department
  * Delete departments, roles, and employees
  * View the total budget of a department (i.e., the sum total of the salaries of all emplyees within a department)

## Link to walkthrough tutorial
[Employee Tracker walkthrough](https://drive.google.com/file/d/19Dshv_0KhsN8zuM275AF9tV77LjjyLN_/view?usp=share_link)

## Screenshots
<img src="./assets/images/Screenshot1.png">
<img src="./assets/images/Screenshot2.png">
<img src="./assets/images/Screenshot3.png">

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

# NPM Packages Utilized
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [Console.table](https://www.npmjs.com/package/console.table)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [MySQL2](https://www.npmjs.com/package/mysql2#installation)
