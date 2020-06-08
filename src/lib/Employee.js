// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
        this.name = name
        this.id = id
        this.email = email
        //three methods required by parent class
    }
    //methods defined outside of constructor

    getName() {
        return this.name
    }

    getId() {
        return this.id
    }

    getEmail() {
        return this.email
    }
    
    getRole() {
        return "Employee"
        //four methods for parent class - as defined in the 'readme' file
    }
}
 
module.exports = Employee 
//allows Employee object to be exported