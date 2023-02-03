const {Schema, model} = require('mongoose');

const ClaseSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String},
    fechaInicio: {type: Date},
    fechaFin: {type: Date}
});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
ClaseSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Clase', ClaseSchema);