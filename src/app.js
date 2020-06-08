 const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//output into output director in root director
//team html is name of filen

const render = require("./lib/htmlRenderer");

const questions = [
    {
        name: "role",
        message: "select employee role",
        type: "choice"
    },
    {
        name: "name",
        message: "enter employee name",
        type: "input",
    },
    {
        name: "email",
        message: "enter employee email",
        type: "input",
    },
    {
        name: "id",
        message: "enter employee ID",
        type: "input",
    },
    {
        name: "school",
        message: "enter intern's school name",
        type: "input",
    },
    {
        name: "github",
        message: "enter engineer's github username",
        type: "input",
    },
    {
        name: "office",
        message: "enter managers office number",
        type: "input",
    },
]

function init(){
    inquirer.prompt(questions)
}

//overall point - dynamically create team 1)manage x amount of all else

//manager is necessary! engineers and interns aren't

//when creating man/engineer/interns - ask a different set of questions

//3 sets of questions will be needed!

//template file contains relevant questions!

//init should file a 'create manager object' function
//.then gets those answers and creates new manager object
//.then render - into HTML
//new object needs to go into an empty array (.them)
//new function (who do you want....call function....calls unique function
//for role - or escapes to render - created roll object pushes to the array!)





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
