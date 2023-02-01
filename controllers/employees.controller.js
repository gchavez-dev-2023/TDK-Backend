const employeesCtrl = {}

const Employee = require('../models/Employee');

employeesCtrl.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

employeesCtrl.createEmployee = async (req, res) => {
    //console.log(req.body);
    const newEmployee = new Employee(req.body);
    await newEmployee.save();

    console.log(newEmployee);
    res.send({message: 'Employee Created'});
}

employeesCtrl.getEmployee = async (req, res) => {
    //console.log(req.params)
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
}

employeesCtrl.updateEmployee = async(req, res) => {
    //console.log(req.params)
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.send({message: 'Employee Updated'});
}

employeesCtrl.deleteEmployee = async (req, res) => {
    //console.log(req.params)
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.send({message: 'Employee Deleted'});
}

module.exports = employeesCtrl;