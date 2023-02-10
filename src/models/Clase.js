const {Schema, model} = require('mongoose');

const ClaseSchema = new Schema({
    nombre: {type: String, required: true, unique: true},
    descripcion: {type: String},
    niveles: [{
        type: Schema.Types.ObjectId,
        ref: 'Nivel',
    }],
    categorias: [{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
    }],
    subCategorias: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategoria',
    }],
    fechaInicio: {type: Date},
    fechaFin: {type: Date},
    img: {type: String},
    academia: {
        type: Schema.Types.ObjectId,
        ref: 'Academia',
        required: true
    },
    instructor: {
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
    collection: 'clases'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
ClaseSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Clase', ClaseSchema);