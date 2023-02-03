const { response } = require('express');
const Instructor = require('../models/Instructor');

const getInstructors = async (req, res = response) => {
    const Instructores = await Instructor.find({}, 'nombre email role google ');

    res.json({
        ok: true,
        Instructores            
    });
}

const createInstructor = async (req, res = response) => {
    //Desestructurar el body
    const {email, password, nombre} = req.body;

    try {
        //Buscar por email = email
        const existeMail = await Instructor.findOne({ email });

        //Si existe correo enviar error
        if ( existeMail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        
        //Crear Instructor
        const Instructor = new Instructor(req.body);

        //Guardar nuevo Instructor
        await Instructor.save();

        console.log(Instructor);
        res.json({
            ok: true,
            Instructor       
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
    //console.log(req.params)
    const Instructor = await Instructor.findById(req.params.id);
    res.send(Instructor);
}

const updateInstructor = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {password, google, email, ...campos } = req.body;

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

        //Verificar si email ya no es igual a del Instructor en la BD
        if (existeDB.email !== email){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeMail = await Instructor.findOne({email});

            //Si existe se responde error
            if (existeMail){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });
            }
            //Agregar el mail a los campos a actualizar
            campos.email = email;
        }

        const InstructorActualizado = await Instructor.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            Instructor: InstructorActualizado     
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
        const Instructor = await Instructor.findByIdAndDelete(req.params.id);
        
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