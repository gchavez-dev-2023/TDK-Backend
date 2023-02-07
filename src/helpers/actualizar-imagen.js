const fs = require('fs');
const path = require ('path');

const Alumno = require('../models/Alumno');
const Empleado = require('../models/Empleado');
const Instructor = require('../models/Instructor');

const borrarImagen = ( pathImg ) => {
    //console.log(pathImg);
    //Verificar si existe imagen anterior y borrar el archivo
    if ( fs.existsSync(pathImg) ){
        // borrar la imagen anterior
        fs.unlinkSync(pathImg);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo;

    switch (tipo){
        case 'alumnos':
            //Treae alumno de BD y verificar si existe
            const alumno = await Alumno.findById(id);
            if (!alumno){
                console.log('No es un Id de Alumno valido.');
                return false;
            }

            //Verificar si existe imagen anterior y borrar el archivo
            pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ alumno.img }`);
            borrarImagen(pathViejo);

            alumno.img = nombreArchivo;
            await alumno.save();
            return true;
            break;

        case 'empleados':
            //Treae Empleado de BD y verificar si existe
            const empleado = await Empleado.findById(id);
            if (!empleado){
                console.log('No es un Id de Empleado valido.');
                return false;
            }

            //Verificar si existe imagen anterior y borrar el archivo
            pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ empleado.img }`);
            borrarImagen(pathViejo);

            empleado.img = nombreArchivo;
            await empleado.save();
            return true;
            break;
        case 'instructores':
            //Treae Instructor de BD y verificar si existe
            const instructor = await Instructor.findById(id);
            if (!instructor){
                console.log('No es un Id de instructor valido.');
                return false;
            }

            //Verificar si existe imagen anterior y borrar el archivo
            pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ instructor.img }`);
            
            borrarImagen(pathViejo);

            instructor.img = nombreArchivo;
            await instructor.save();
            return true;
            break;
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}