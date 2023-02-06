const { response } = require('express');
const Academia = require('../models/Academia');

const getAcademies = async (req, res = response) => {
    try{
        const academias = await Academia.find({}, 'nombre direccion usuario').populate('usuario', 'nombre');

        res.json({
            ok: true,
            academias            
        });
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createAcademy = async (req, res = response) => {
    //Desestructurar el body
    const {nombre, direccion} = req.body;
    

    try {
        //Buscar por nombre = nombre
        const existeNombre = await Academia.findOne({ nombre });
        

        //Si existe nombre enviar error
        if ( existeNombre ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya está registrado'
            });
        }
        
        //Obtener el ID del usuario desde el token
        const usuario = req._id;

        //Crear academia
        const academia = new Academia({
            usuario,
            ...req.body});

        //Guardar nuevo Academia
        await academia.save();

        console.log(academia);
        res.json({
            ok: true,
            academia       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const getAcademy = async (req, res = response) => {
    try {
        //console.log(req.params)
        const academia = await Academia.findById(req.params.id).populate('usuario', 'nombre');
        
        res.json({
            ok: true,
            academia            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateAcademy = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {nombre, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Academia.findById(req.params.id);

        //Si no existe Academia enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Academia por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Academia en la BD
        if (existeDB.nombre !== nombre){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeNombre = await Academia.findOne({nombre});

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

        const academiaActualizado = await Academia.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            academia: academiaActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteAcademy = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Academia.findById(req.params.id);

        //Si no existe Academia enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Academia por el ID.'
            });
        }

        //console.log(req.params)
        const academia = await Academia.findByIdAndDelete(req.params.id);
        
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
    getAcademies,
    createAcademy,
    getAcademy,
    updateAcademy,
    deleteAcademy
};