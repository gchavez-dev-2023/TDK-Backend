const {Schema, model} = require('mongoose');

const CategoriaSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String}
});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
CategoriaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Categoria', CategoriaSchema);