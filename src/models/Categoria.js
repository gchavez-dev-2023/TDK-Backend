const {Schema, model} = require('mongoose');

const CategoriaSchema = new Schema({
    nombre: {type: String, required: true, unique: true},
    descripcion: {type: String},
    img: {type: String},
    createdByUser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    updatedByUser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
}, {timestaps: true,
    collection: 'categorias'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
CategoriaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Categoria', CategoriaSchema);