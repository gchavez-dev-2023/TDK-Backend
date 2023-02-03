const { response } = require('express');
const Empleado = require('../models/Empleado');

const getEmployees = async (req, res = response) => {
    const Empleados = await Empleado.find();
    res.json(Empleados);
}

const createEmployee = async (req, res = response) => {
    //console.log(req.body);
    const newEmpleado = new Empleado(req.body);
    await newEmpleado.save();

    console.log(newEmpleado);
    res.send({message: 'Empleado Created'});
}

const getEmployee = async (req, res = response) => {
    //console.log(req.params)
    const Empleado = await Empleado.findById(req.params.id);
    res.send(Empleado);
}

const updateEmployee = async(req, res = response) => {
    //console.log(req.params)
    const Empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body);
    res.send({message: 'Empleado Updated'});
}

const deleteEmployee = async (req, res = response) => {
    //console.log(req.params)
    const Empleado = await Empleado.findByIdAndDelete(req.params.id);
    res.send({message: 'Empleado Deleted'});
}

module.exports = {
    getEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
};