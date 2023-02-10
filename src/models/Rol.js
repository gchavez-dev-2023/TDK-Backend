const {Schema, model} = require('mongoose');

const RolSchema = new Schema({
    nombre: {type: String, required: true},
    createdByUser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    updatedByUser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }
}, {timestaps: true,
    collection: 'roles'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
RolSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Rol', RolSchema);