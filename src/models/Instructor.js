const {Schema, model} = require('mongoose');

const InstructorSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    img: {type: String},
    rol: {type: String, required: true, default: 'USER_ROLE'},
    google: {type: Boolean, default: false},
});

//Configuración para que campo "_id" tengo el nombre "uid"
/*
InstructorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
*/

module.exports = model('Instructor', InstructorSchema);