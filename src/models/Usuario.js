const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    google: {type: Boolean, default: false},
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Rol',
    }],
    createdByUser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    updatedByUser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
}, {timestaps: true,
    collection: 'usuarios'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Usuario', UsuarioSchema);