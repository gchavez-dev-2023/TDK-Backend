const fs = require('fs');
const path = require ('path');

const Usuario = require('../models/Usuario');
const Academia = require('../models/Academia');
const Categoria = require('../models/Categoria');
const SubCategoria = require('../models/SubCategoria');
const Nivel = require('../models/Nivel');
const Clase = require('../models/Clase');

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
        case 'usuarios':
            //Trae usuario de BD y verificar si existe
            const usuario = await Usuario.findById(id);
            if (!usuario){
                console.log('No es un Id de Usuario valido.');
                return false;
            }

            //Verificar si existe imagen anterior y borrar el archivo
            pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ usuario.img }`);
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;

            case 'academias':
                //Trae usuario de BD y verificar si existe
                const academia = await Academia.findById(id);
                if (!academia){
                    console.log('No es un Id de Academia valido.');
                    return false;
                }
    
                //Verificar si existe imagen anterior y borrar el archivo
                pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ academia.img }`);
                borrarImagen(pathViejo);
    
                academia.img = nombreArchivo;
                await academia.save();
                return true;
                break;

            case 'categorias':
                //Trae usuario de BD y verificar si existe
                const categoria = await Categoria.findById(id);
                if (!categoria){
                    console.log('No es un Id de Categoria valido.');
                    return false;
                }
    
                //Verificar si existe imagen anterior y borrar el archivo
                pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ categoria.img }`);
                borrarImagen(pathViejo);
    
                categoria.img = nombreArchivo;
                await categoria.save();
                return true;
                break;

            case 'subcategorias':
                //Trae usuario de BD y verificar si existe
                const subcategoria = await SubCategoria.findById(id);
                if (!subcategoria){
                    console.log('No es un Id de SubCategoria valido.');
                    return false;
                }
    
                //Verificar si existe imagen anterior y borrar el archivo
                pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ subcategoria.img }`);
                borrarImagen(pathViejo);
    
                subcategoria.img = nombreArchivo;
                await subcategoria.save();
                return true;
                break;

            case 'niveles':
                //Trae usuario de BD y verificar si existe
                const nivel = await Nivel.findById(id);
                if (!nivel){
                    console.log('No es un Id de Nivel valido.');
                    return false;
                }
    
                //Verificar si existe imagen anterior y borrar el archivo
                pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ nivel.img }`);
                borrarImagen(pathViejo);
    
                nivel.img = nombreArchivo;
                await nivel.save();
                return true;
                break;

            case 'clases':
                //Trae usuario de BD y verificar si existe
                const clase = await Clase.findById(id);
                if (!clase){
                    console.log('No es un Id de Clase valido.');
                    return false;
                }
    
                //Verificar si existe imagen anterior y borrar el archivo
                pathViejo = path.join( __dirname, `../uploads/${ tipo }/${ clase.img }`);
                borrarImagen(pathViejo);
    
                clase.img = nombreArchivo;
                await clase.save();
                return true;
                break;
    
        default:
            console.log('Tipo no valido.');
            return false
            break;
    }
}

module.exports = {
    actualizarImagen
}