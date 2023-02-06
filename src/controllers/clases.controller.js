const { response } = require('express');
const Clase = require('../models/Clase');

const getClasses = async (req, res = response) => {
    try{
        const clases = await Clase.find({}, 'nombre descripcion fechaInicio fechaFin usuario').populate('usuario', 'nombre');

        res.json({
            ok: true,
            clases            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createClass = async (req, res = response) => {
    //Desestructurar el body
    const {nombre, descripcion, fechaInicio, fechaFin} = req.body;

    try {
        //Buscar por nombre = nombre
        const existeNombre = await Clase.findOne({ nombre });

        //Si existe nombre enviar error
        if ( existeNombre ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya está registrado'
            });
        }
        
        //Obtener el ID del usuario desde el token
        const usuario = req._id;

        //Crear clase
        const clase = new Clase({
            usuario,
            ...req.body});

        //Guardar nuevo clase
        await clase.save();

        console.log(clase);
        res.json({
            ok: true,
            clase       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const getClass = async (req, res = response) => {
    try {
        //console.log(req.params)
        const clase = await Clase.findById(req.params.id);
        
        res.json({
            ok: true,
            clase            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateClass = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {nombre, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Clase.findById(req.params.id);

        //Si no existe Clase enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Clase por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Clase en la BD
        if (existeDB.nombre !== nombre){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeNombre = await Clase.findOne({nombre});

            //Si existe se responde error
            if (existeNombre){
                return res.status(400).json({
                    ok: false,
                    msg: 'El nombre ya está registrado'
                });
            }
            //Agregar el nombre a los campos a actualizar
            campos.nombre = nombre;
        }

        const claseActualizado = await Clase.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            clase: claseActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteClass = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Clase.findById(req.params.id);

        //Si no existe Clase enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Clase por el ID.'
            });
        }

        //console.log(req.params)
        const clase = await Clase.findByIdAndDelete(req.params.id);
        
        res.json({
            ok: true,
            _id: req.params.id     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

module.exports = {
    getClasses,
    createClass,
    getClass,
    updateClass,
    deleteClass
};