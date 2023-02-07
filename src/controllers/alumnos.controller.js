const { response } = require('express');
const Alumno = require('../models/Alumno');

const getTrainees = async (req, res = response) => {
    try {
        const alumnos = await Alumno.find({}, 'rut nombres apellidos fechaNacimiento telefono img');

        res.json({
            ok: true,
            alumnos            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createTrainee = async (req, res = response) => {
    //Desestructurar el body
    const {rut, nombres, apellidos, fechaNacimiento, telefono} = req.body;

    try {
        //Buscar por rut = rut
        const existeRut = await Alumno.findOne({ rut });

        //Si existe rut enviar error
        if ( existeRut ) {
            return res.status(400).json({
                ok: false,
                msg: 'El rut ya está registrado'
            });
        }
        
        //Obtener el ID del usuario desde el token
        const usuario = req._id;

        //Crear alumno
        const alumno = new Alumno({
            usuario,
            ...req.body});

        //Guardar nuevo alumno
        await alumno.save();

        console.log(alumno);
        res.json({
            ok: true,
            alumno       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }

}

const getTrainee = async (req, res = response) => {
    try{
        //console.log(req.params)
        const alumno = await Alumno.findById(req.params.id);
        
        res.json({
            ok: true,
            alumno            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateTrainee = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {rut, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Alumno.findById(req.params.id);

        //Si no existe alumno enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe alumno por el ID.'
            });
        }

        //Verificar si email ya no es igual a del alumno en la BD
        if (existeDB.rut !== rut){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeRut = await Alumno.findOne({rut});

            //Si existe se responde error
            if (existeRut){
                return res.status(400).json({
                    ok: false,
                    msg: 'El rut ya está registrado'
                });
            }
            //Agregar el rut a los campos a actualizar
            campos.rut = rut;
        }

        const alumnoActualizado = await Alumno.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            alumno: alumnoActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteTrainee = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Alumno.findById(req.params.id);

        //Si no existe alumno enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe alumno por el ID.'
            });
        }

        //console.log(req.params)
        const alumno = await Alumno.findByIdAndDelete(req.params.id);
        
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
    getTrainees,
    createTrainee,
    getTrainee,
    updateTrainee,
    deleteTrainee
};