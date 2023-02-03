const {Schema, model} = require('mongoose');

const ClienteSchema = new Schema({
    rut: {type: String, required: true, unique: true},
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    fechaNacimiento: {type: Date },
    telefono: {type: String },
    img: {type: String},
});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
ClienteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Cliente', ClienteSchema);