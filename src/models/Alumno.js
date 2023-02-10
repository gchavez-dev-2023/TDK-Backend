const {Schema, model} = require('mongoose');

const AlumnoSchema = new Schema({
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
    },
    createdByUser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    updatedByUser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
}, {timestaps: true,
    collection: 'alumnos'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
AlumnoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Alumno', AlumnoSchema);