const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    rol: {type: String, required: true, default: 'USER_ROLE'},
    google: {type: Boolean, default: false},
}, {collection: 'usuarios'});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Usuario', UsuarioSchema);