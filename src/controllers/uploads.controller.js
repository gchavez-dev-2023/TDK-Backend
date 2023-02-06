const fs = require('fs');
const path = require ('path');
const { response } = require ('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async(req, res = response ) => {
    
    try {
        const tipo = req.params.tipo;
        const id = req.params.id;

        //Validar tipos 
        const tipoValidos = ['academias', 'categorias', 'subcategorias', 'niveles', 'clases', 'empleados', 'instructores', 'clientes'];
        if(!tipoValidos.includes(tipo)){
            res.status(400).json({
                ok: false,
                msg: 'No es un empleado, instructores, clientes (tipo).'       
            });
        }

        //Validar que exista un archivo
        if (!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningún archivos.'       
            });
        }

        //Procesar imagen
        const file = req.files.image;
        const nombreCortado = file.name.split('.'); // imagen.1.3.42.jpg

        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        //Validar extension
        const extensionesValidas = ['png', 'jpg', 'jpeg'];
        if (!extensionesValidas.includes(extensionArchivo.toLowerCase())){
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension permitida.'    
            });      
        }
        
        //Generar el nombre del archivo
        const nombreArchivo = `${ uuidv4() }.${extensionArchivo.toLowerCase()}`;

        //Path para guardar archivo
        const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ nombreArchivo }`);
        //console.log(pathImg)

        //Mover la imagen recuperada al Path
        file.mv( pathImg, (err) => {
            if (err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen.'    
                });    
            }         
            
            // Actualizar base de datos
            actualizarImagen(tipo, id, nombreArchivo);
            
            res.json({
                ok: true,
                msg: 'Archivo subido.',
                nombreArchivo
            });
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const returnImage = (req, res = response) => {

    const tipo = req.params.tipo;    
    const imagen = req.params.imagen;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ imagen }`);

    //console.log(pathImg);
    if (fs.existsSync( pathImg )){
        res.sendFile( pathImg );
    }else{
        const pathNoImg = path.join( __dirname, `../uploads/no-imagen-available.jpg`);
        res.sendFile( pathNoImg );
    }

}

module.exports = {
    fileUpload, 
    returnImage
}


