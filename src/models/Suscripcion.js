const {Schema, model} = require('mongoose');

const SuscripcionSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',        
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
SuscripcionSchema.index({ cliente: 1, clase: 1 }, { unique: true });

module.exports = model('Suscripcion', SuscripcionSchema);