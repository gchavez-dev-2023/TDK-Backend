const {Schema, model} = require('mongoose');

const SuscripcionSchema = new Schema({
    cliente: {type: String, required: true},
    clase: {type: String, required: true},
    fechaSuscripcion: {type: String}
});

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