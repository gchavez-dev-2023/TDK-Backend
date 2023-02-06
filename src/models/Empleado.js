const {Schema, model} = require('mongoose');

const EmpleadoSchema = new Schema({
    rut: {type: String, required: true, unique: true},
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    fechaNacimiento: {type: Date },
    telefono: {type: String },
    img: {type: String},
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',        
        required: true
    }
}, {collection: 'empleados'});

module.exports = model('Empleado', EmpleadoSchema);