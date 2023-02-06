const {Schema, model} = require('mongoose');

const ClaseSchema = new Schema({
    nombre: {type: String, required: true, unique: true},
    descripcion: {type: String},
    fechaInicio: {type: Date},
    fechaFin: {type: Date},
    academia: {
        type: Schema.Types.ObjectId,
        ref: 'Academia',
        required: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',        
        required: true
        }
}, {collection: 'clases'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
ClaseSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Clase', ClaseSchema);