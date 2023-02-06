const { response } = require('express');
const Nivel = require('../models/Nivel');

const getLevels = async (req, res = response) => {
    try {
        const niveles = await Nivel.find({}, 'nombre orden');

        res.json({
            ok: true,
            niveles            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createLevel = async (req, res = response) => {
    //Desestructurar el body
    const {nombre, orden} = req.body;

    try {
        //Buscar por nombre = nombre
        const existeNombre = await Nivel.findOne({ nombre });

        //Si existe nombre enviar error
        if ( existeNombre ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya está registrado'
            });
        }
        
        //Obtener el ID del usuario desde el token
        const usuario = req._id;

        //Crear nivel
        const nivel = new Nivel({
            usuario,
            ...req.body});

        //Guardar nuevo nivel
        await nivel.save();

        console.log(nivel);
        res.json({
            ok: true,
            nivel       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const getLevel = async (req, res = response) => {
    try{
        //console.log(req.params)
        const nivel = await Nivel.findById(req.params.id);
        
        res.json({
            ok: true,
            nivel            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateLevel = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {nombre, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Nivel.findById(req.params.id);

        //Si no existe Nivel enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Nivel por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Nivel en la BD
        if (existeDB.nombre !== nombre){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeNombre = await Nivel.findOne({nombre});

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

        const nivelActualizado = await Nivel.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            nivel: nivelActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteLevel = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Nivel.findById(req.params.id);

        //Si no existe Nivel enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Nivel por el ID.'
            });
        }

        //console.log(req.params)
        const nivel = await Nivel.findByIdAndDelete(req.params.id);
        
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
    getLevels,
    createLevel,
    getLevel,
    updateLevel,
    deleteLevel
};