const {Schema, model} = require('mongoose');

const NivelSchema = new Schema({
    nombre: {type: String, required: true},
    orden: {type: Number},
    img: {type: String},
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',        
        required: true
    }
}, {collection: 'niveles'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
NivelSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Nivel', NivelSchema);