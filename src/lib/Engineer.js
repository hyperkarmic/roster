// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.


const Employee = require("./Employee");
//allows importation of Employee object

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    //allows inheritance of name/id/email from parent Employee object
    this.github = github;
    //github a property that belongs to the Engineer Class.
  }
  getGithub() {
    return this.github;
  }

  //a getter method for returning the github property
  
  getRole() {
    return "Engineer";
  }
  //this returns the role for the Engineer object
}
module.exports = Engineer;
