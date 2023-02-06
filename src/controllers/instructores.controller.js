const { response } = require('express');
const Instructor = require('../models/Instructor');

const getInstructors = async (req, res = response) => {
    try {
        const instructores = await Instructor.find({}, 'rut nombres apellidos fechaNacimiento telefono img');

        res.json({
            ok: true,
            instructores            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createInstructor = async (req, res = response) => {
    //Desestructurar el body
    const {rut, nombres, apellidos, fechaNacimiento, telefono} = req.body;

    try {
        //Buscar por rut = rut
        const existeRut = await Instructor.findOne({ rut });

        //Si existe rut enviar error
        if ( existeRut ) {
            return res.status(400).json({
                ok: false,
                msg: 'El rut ya está registrado'
            });
        }
        
        //Obtener el ID del usuario desde el token
        const usuario = req._id;

        //Crear instructor
        const instructor = new Instructor({
            usuario,
            ...req.body});

        //Guardar nuevo instructor
        await instructor.save();

        console.log(instructor);
        res.json({
            ok: true,
            instructor       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }

}

const getInstructor = async (req, res = response) => {
    try{
        //console.log(req.params)
        const instructor = await Instructor.findById(req.params.id);
        
        res.json({
            ok: true,
            instructor            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateInstructor = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {rut, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Instructor.findById(req.params.id);

        //Si no existe Instructor enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Instructor por el ID.'
            });
        }

        //Verificar si rut ya no es igual a del Instructor en la BD
        if (existeDB.rut !== rut){
            //Verificar si el rut nuevo ya se encuentra registrado
            const existeRut = await Instructor.findOne({rut});

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

        const instructorActualizado = await Instructor.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            instructor: instructorActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteInstructor = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Instructor.findById(req.params.id);

        //Si no existe Instructor enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Instructor por el ID.'
            });
        }

        //console.log(req.params)
        const instructor = await Instructor.findByIdAndDelete(req.params.id);
        
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
    getInstructors,
    createInstructor,
    getInstructor,
    updateInstructor,
    deleteInstructor
};