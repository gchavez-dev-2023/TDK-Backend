const {Schema, model} = require('mongoose');

const SuscripcionSchema = new Schema({
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno',        
        required: true
    },
    clase: {
        type: Schema.Types.ObjectId,
        ref: 'Clase',        
        required: true
    },
    fechaSuscripcion: {type: String},
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',        
        required: true
    }
}, {collection: 'suscripciones'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
SubcripcionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/
//Crear indices compuestos
SuscripcionSchema.index({ alumno: 1, clase: 1 }, { unique: true });

module.exports = model('Suscripcion', SuscripcionSchema);