const Manager = require("./src/lib/Manager");
const Engineer = require("./src/lib/Engineer");
const Intern = require("./src/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//these are all the modules Node needs to import to run the app

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//these variables dictate the name and location of the created team.HTML file

const render = require("./src/lib/htmlRenderer");
//this is an imported HTML rendering library

let teamMembers = [];
//this empty array is where created instances of manager/intern/engineer are pushed too!

//these are the team questions - Manager is absent an instance of has already been created!

const addTeamQuestions = [
  {
    type: "list",
    name: "jobTitle",
    message:
      'Choose team member to create - or select "Create" to create document!',
    choices: ["Engineer", "Intern", "Create"],
  },
];

//these are the questions for 'create manager' - office Number is specific question
//for manager.  Basic validation added

const managerQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "What is the manager's name?",
    validate: (answer) => {
      if (answer.length < 1) {
        return "please enter a name with at least one character!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "managerId",
    message: "What is the manager's id?",
    validate: (answer) => {
      if (answer.length < 1) {
        return "please enter an id!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is the manager's e-mail?",
    validate: (answer) => {
        //testing to see if "@"" and "." are present
      if (answer.includes('@') === false && answer.includes('.') === false) {
        return "please enter an email with an '@' and a '.' in it!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "managerOfficeNumber",
    message: "What is the manager's office number?",
    validate: (answer) => {
        //testing to make sure input is a number
      if (isNaN(answer) === true) {
        return "please enter an office number with at least number!";
      }
      return true;
    },
  },
];

//these are the questions for 'create employee'.  Github username is the unique
//information here.  Basic validation added
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "input engineer's name",
    validate: (answer) => {
      if (answer.length < 1) {
        return "please enter a name with at least one character!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "id",
    message: "Input Engineer's ID",
    validate: (answer) => {
        if (answer.length < 1) {
          return "please enter an id!";
        }
        return true;
      },
  },
  {
    type: "input",
    name: "email",
    message: "Input engineer's email address",
    validate: (answer) => {
        //testing to see if "@"" and "." are present
      if (answer.includes('@') === false && answer.includes('.') === false) {
        return "please enter an email with an '@' and a '.' in it!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "username",
    message: "Input engineer's github username",
    validate: (answer) => {
        if (answer.length < 1) {
          return "please enter a github username of a length of at least one character!";
        }
        return true;
      },
  },
];

//these are the questions for 'create intern' - the school is the unique question here.
//Basic validation added
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "Input intern's name",
    validate: (answer) => {
      if (answer.length < 1) {
        return "please enter a name with at least one character!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "id",
    message: "Input intern's ID",
    validate: (answer) => {
        if (answer.length < 1) {
          return "please enter an id!";
        }
        return true;
      },
  },
  {
    type: "input",
    name: "email",
    message: "Input intern's email address",
    validate: (answer) => {
        //testing to see if "@"" and "." are present - as they need to be in e-mail!
      if (answer.includes('@') === false && answer.includes('.') === false) {
        return "please enter an email with an '@' and a '.' in it!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "school",
    message: "Input intern's school",
    validate: (answer) => {
        if (answer.length < 1) {
          return "please enter a school name with a length of at least one character!";
        }
        return true;
      },
  },
];

//this is the initializer function - and contains all the 'creator' functions for the individual
//job roles - as well as the function that renders the array containing the entered team
//information to the html page!

function init() {
  //this first sub-function deploys the logic that allows us to choose what
  //type of team member is created - or allows us to render a finished team
  //when we are ready!

  function createTeam() {
    inquirer.prompt(addTeamQuestions).then((answers) => {
      if (answers.jobTitle === "Manager") {
        createManager();
      } else if (answers.jobTitle === "Engineer") {
        createEngineer();
      } else if (answers.jobTitle === "Intern") {
        createIntern();
      } else if (answers.jobTitle === "Create") {
        buildTeam();
      }
    });
  }

  //this function allows us to create a manager.  It is fired once at the beginning
  //of the app execution.  It creates a single instance of the manager class, pushes
  //the instance to the 'teamMembers' array and then invokes the 'createTeam' function

  function createManager() {
    inquirer.prompt(managerQuestions).then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
      );
      teamMembers.push(manager);
      createTeam();
    });
  }

  //this is the create Engineer function.  A new instance is created, populated with
  //relevant information, pushed to the 'team members array' and then the 
  //createTeam function is invoked!
  function createEngineer() {
    inquirer.prompt(engineerQuestions).then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.username
      );
      teamMembers.push(engineer);
      createTeam();
    });
  }

  //now we add the intern functonality - new instance created, pushed to the
  //team members array, and then the create team function is invoked!
  function createIntern() {
    inquirer.prompt(internQuestions).then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
      createTeam();
    });
  }
  //this function renders all the team members pushed to the array, to HTML
  //and ensures that the strings are encoded in utf-8 format
  function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

    console.log("The team.html file has now been created and located in the input file");
    //I've used a console log here as it inputs a message at the end of the process
    //and using a 'return statement' did not seem to output it!
  }

  createManager();
  //this ensures that the createManager function fires first - ensuring at least one instance of is created!
}

init();
//initializer invocation function - sets off app!

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
