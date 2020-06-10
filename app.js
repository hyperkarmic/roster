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

const addTeamQuestions = [
    {
        type: "confirm",
        name: "addTeam",
        message: "Would you like to add a another team member?",
        default: true,
      },
    {
        type: 'list',
        name: 'jobTitle',
        message: 'what job role does this team member have?',
        choices: [
          'Engineer', 'Intern',
        ],
        when: (answers) => {
            return answers.addTeam === true;
          },
        },]





function init(){

    function createManager(){
        inquirer.prompt(managerQuestions).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager);
            createTeam()
        
        });

        function createTeam() {
            inquirer.prompt(addTeamQuestions).then(answers => {
                if (answers.jobTitle == "Engineer") {
                    createEngineer()
                }
                else if(answers.jobTitle == "Intern") {
                    createIntern()
                } 
                else if(answers.jobTitle == "None") {
                buildTeam()    
                
                }
                
            })

            buildTeam(fs.writeFileSync(outputPath, render(teamMembers), "utf-8"))
        }

        

    }

    createManager()

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
