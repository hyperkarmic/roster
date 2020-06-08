// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
//Employee object imported

class Manager extends Employee {
  //sub-class declared - from parent 'Employee' object
  
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    //name, id and e-mail are inherited from Employee class
    this.officeNumber = officeNumber;
    //officeNumber created locally rather than imported
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
  //returns 'this' office Number rather than pne accessed via super
  getRole() {
    return "Manager";
  }
  //returns Role specifically for manager.
  
}

module.exports = Manager;