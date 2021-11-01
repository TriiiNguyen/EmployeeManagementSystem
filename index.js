const inquirer = require('inquirer');
const mysql = require('mysql2');

require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // TODO: Add MySQL Password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

//connecting to db 
db.connect((sqlErr) => {
  if (sqlErr) throw sqlErr
  else {
    console.log(`Connected to the employee_db database.`);
    //after connection ask question 
    init();
  }
})

function init() {

  console.log("Welcome to Employee Management System !!!");

  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "options",
        message: "What would you like to do ?",
        choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Exit"]
      }

    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      console.log(answers.options);
      var userInput = answers.options;
      //if elseif condtions 
      if (userInput === "View All Employees") {
        // viewEmployees(); 
        const sql = `SELECT * FROM employee`;

        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err);
          }
          else {
            //print all database values 
            console.table(rows);
            init()
          }
        });
      }
      else if (userInput === "View All Roles") {
        //query the databse 
        const sql = `SELECT * FROM role`;

        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err);
          }
          else {
            //print all database values 
            console.table(rows);
            init()
          }
        });
      }
      else if (userInput === "View All Departments") {
        //query the databse 
        const sql = `SELECT * FROM department`;

        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err);
          }
          else {
            //print all database values 
            console.table(rows);
            init()
          }
        });
      }
      else if (userInput === "Add Department") {
        //query the databse 
        
          inquirer.prompt([
            {
              type: "input",
              name: "add_department",
              message: "Department name: ",

            }
          ])
            .then((answers) => {
              db.query('INSERT INTO department SET name = ?', answers.add_department, function (err, results) {
                if (err) {
                  console.log(err)
                }
                console.log('Department added!')
                init()
              })

            })
      }
      else if (userInput === "Add Role"){
        inquirer.prompt([
          {
            type: "input",
            name: "add_role",
            message: "Name of role: ",

          }
        ])
          .then((answers) => {
            db.query('INSERT INTO role SET title = ?', answers.add_role, function (err, results) {
              if (err) {
                console.log(err)
              }
              console.log('Role added!')
              init()
            })

          })
      }
      else if (userInput === "Add Employee"){
        inquirer.prompt([
          {
            type: "input",
            name: "add_employee",
            message: "New employee full name: ",

          }
        ])
          .then((answers) => {
            db.query('INSERT INTO employee SET full_name = ?', answers.add_employee, function (err, results) {
              if (err) {
                console.log(err)

              }
              console.log('Employee name added!')
              init()
            })

          })
      }
      else { 
        //QUIT 
        console.log("Good bye!! ");
        process.exit();
      }

    })
    .catch((error) => {
      console.log(error);
    });
}

// function viewDepartment(){
//   //query the databse 
//   const sql = `SELECT * FROM department`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       //print all database values 
//       console.table(rows);

//       //ask the question again 
//       init(); 
//     }
//   });
// }

// function addEmployee() {
//   const newEmployee = 'INSERT INTO employee SET first_name = ? last_name = ?';

//   db.query(newEmployee, (err, results) => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log('New Employee added!!!')
//       init();
//     }
//   })
  
// }