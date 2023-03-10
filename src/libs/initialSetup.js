const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");
const { encrypt } = require('../helpers/cifrador');

const createInitialSetup = async() => {
    try {
        let contador;
        let values;

        contador = await Rol.estimatedDocumentCount();
    
        if (contador > 0){
            return;
        } else {
            values = await Promise.all([
                new Rol({nombre: 'alumno', jerarquia: 10}).save(),
                new Rol({nombre: 'instructor', jerarquia: 20}).save(),
                new Rol({nombre: 'empleado', jerarquia: 30}).save(),
                new Rol({nombre: 'administrador', jerarquia: 99}).save()
            ]);
    
            console.log(values);
        }
        
        const rol = await Rol.findOne({ nombre: 'administrador'} );

        contador = await Usuario.estimatedDocumentCount({roles : [rol._id]});

        if (contador > 0){
            return;
        } else {
            values = await Promise.all([
                new Usuario({email: 'admin@admin.com', password: encrypt( 'admin' ), roles: [rol], rut: '1-9', nombres: 'admin', apellidos: 'admin'}).save()
            ]);

            console.log(values);
        }
    } catch (error) {
        console.error(error);
        
    }
}


module.exports = {
    createInitialSetup
};