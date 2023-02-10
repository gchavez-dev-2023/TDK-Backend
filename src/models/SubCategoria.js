const {Schema, model} = require('mongoose');

const SubCategoriaSchema = new Schema({
    nombre: {type: String, required: true},
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
    collection: 'subcategorias'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
SubCategoriaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('SubCategoria', SubCategoriaSchema);