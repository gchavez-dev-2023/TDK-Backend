const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    //Datos Usuario
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    google: {type: Boolean, default: false},
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Rol',
    }],
    //Datos Personales
    rut: {type: String, required: true, unique: true},
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    fechaNacimiento: {type: Date },
    telefono: {type: String },
    img: {type: String},
    nivel: {
        type: Schema.Types.ObjectId,
        ref: 'Nivel',
    },
    categoria: [{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
    }],
    subCategoria: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategoria',
    }],
    //Datos auditoria
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