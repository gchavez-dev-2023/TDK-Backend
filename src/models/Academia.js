const {Schema, model} = require('mongoose');

const AcademiaSchema = new Schema({
    nombre: {type: String, required: true, unique: true},
    direccion: {type: String},
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
    collection: 'academias'} );

//Configuración para que campo "_id" tengo el nombre "uid"
/*
AcademiaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Academia', AcademiaSchema);