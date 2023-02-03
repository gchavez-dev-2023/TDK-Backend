const {Schema, model} = require('mongoose');

const EmpleadoSchema = new Schema({
    name: {type: String, required: true},
    position: {type: String, required: true},
    office: {type: String, required: true},
    salary: {type: Number, required: true},
});

module.exports = model('Empleado', EmpleadoSchema);