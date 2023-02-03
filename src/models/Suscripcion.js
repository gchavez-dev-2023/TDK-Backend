const {Schema, model} = require('mongoose');

const SubcripcionSchema = new Schema({
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
User.index({ cliente: 1, clase: 1 }, { unique: true });

module.exports = model('Subcripcion', SubcripcionSchema);