const inquirer = require('inquirer');
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'trinhTRIthong3!',
    database: 'employee_db'
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

  console.log("Welcome to Employee Mgmt System !!!");

  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "options",
        message: "What would you like to do ?",
        choices: ["View All Employees", "Add Employee", "Add Role", "Update Employee Role", "Add Department", "View All Roles", "View All Departments", "Exit"]
      }

    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      console.log(answers.options);
      var userInput = answers.options;
      //if elseif condtions 
      if (userInput === "View All Employees") {
        viewEmployees(); 
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
          }
        });
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

function viewEmployees(){
  //query the databse 
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    else {
      //print all database values 
      console.table(rows);

      //ask the question again 
      init(); 
    }
  });
}