// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");
//parent object imported

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    //these properties are imported from parent 'Employee' object
    this.school = school;
    //additional method specific to intern object 
  }

  getSchool() {
    return this.school;
  }
  //necessary 'getter' method for Intern object
  getRole() {
    return "Intern";
  }
  //returns Intern as instance of intern - rather than 'Employee"

}
module.exports = Intern;
//allows Intern Object to be exported