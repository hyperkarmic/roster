const Manager = require("./src/lib/Manager");
const Engineer = require("./src/lib/Engineer");
const Intern = require("./src/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/lib/htmlRenderer");

let teamMembers = [];

//these are the team questions

const addTeamQuestions = [
    {
      type: 'list',
      name: 'jobTitle',
      message: 'Choose team member to create - or select "None" to create document!',
      choices: ['Manager','Engineer', 'Intern', 'None'],
    },
  ];

  //these are the questions for 'create manager'

const managerQuestions = [
    {type: "input",
     name: "managerName",
     message: "What is the manager's name?",
     validate: answer => {
         if (answer.length < 1){
             return "please enter a name with at least one character!"
         }
         return true;
     }
    
    
    },
    {
        type: "input",
     name: "managerId",
     message: "What is the manager's id?",
     validate: answer => {
         if (answer.length < 0){
             return "please enter an id!"
         }
         return true;

    }},
    {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's e-mail?",
        validate: answer => {
            if (answer.length < 1){
                return "please enter a name with at least one character!"
            }
            return true;   
    }},
    {
        type: "input",
     name: "managerOfficeNumber",
     message: "What is the manager's office number?",
     validate: answer => {
         if (answer.length < 0){
             return "please enter an office number with at least one character!"
         }
         return true;
    }
}

]

//these are the questions for 'create employee'
const engineerQuestions = [
                    
                            
    {
        type: 'input',
        name: 'name',
        message: "input engineer's name",
        validate: answer => {
            if (answer.length < 1){
                return "please enter a name with at least one character!"
            }
            return true;
        }
    },  
    {
        type: 'input',
        name: 'id',
        message: "Input Engineer's ID number",
    }, 
    {
        type: 'input',
        name: 'email',
        message: "Input engineer's email address",
    }, 
    {
        type: 'input',
        name: 'username',
        message: "Input engineer's github username",
    }, 
]

//these are the questions for 'create intern'
const internQuestions = [
    
    {
        type: 'input',
        name: 'name',
        message: "Input intern's name",
        validate: answer => {
            if (answer.length < 1){
                return "please enter a name with at least one character!"
            }
            return true;
        }
    },  
    {
        type: 'input',
        name: 'id',
        message: "Input intern's ID number",
    }, 
    {
        type: 'input',
        name: 'email',
        message: "Input intern's email address",
    }, 
    {
        type: 'input',
        name: 'school',
        message: "Input intern's school",
    }, 
]






//this is the initialiser function - and contains all the 'creator' functions for the individual
//job roles - as well as the function that renders the array containing the entered team
//information to the html page!

function init(){


    //this first sub-function deploys the logic that allows us to choose what
    //type of team member is created - or allows us to render a finished team!

    function createTeam() {
        inquirer.prompt(addTeamQuestions).then(answers => {
            
            if (answers.jobTitle ==="Manager") {
                createManager()
            } 
            else if (answers.jobTitle === "Engineer") {
                createEngineer()
            }
            else if(answers.jobTitle === "Intern") {
                createIntern()
            } 
            else if(answers.addTeam === "None") {
                buildTeam()
            }
        })
    }

    //this function allows us to create a manager

    function createManager(){
        inquirer.prompt(managerQuestions).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager);
            createTeam()
       });
     }

     //this is the create Engineer function
     function createEngineer() {
    inquirer.prompt(engineerQuestions).then(
        answers => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.username);
            teamMembers.push(engineer);
            createTeam();
        }
    )
}


     //now we add the intern functonality
     function createIntern() {
        inquirer.prompt(internQuestions).then(
            answers => {
                const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                teamMembers.push(intern);
                createTeam();
                
              }
        )
    }

    

    createTeam()

 

}

init()





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
