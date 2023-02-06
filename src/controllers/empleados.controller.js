const { response } = require('express');
const Empleado = require('../models/Empleado');

const getEmployees = async (req, res = response) => {
    try {
        const empleados = await Empleado.find({}, 'rut nombres apellidos fechaNacimiento telefono img');
        
        res.json({
            ok: true,
            empleados            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createEmployee = async (req, res = response) => {
    //Desestructurar el body
    const {rut, nombres, apellidos, fechaNacimiento, telefono} = req.body;
    
    try {
        //Buscar por rut = rut
        const existeRut = await Empleado.findOne({ rut });

        //Si existe rut enviar error
        if ( existeRut ) {
            return res.status(400).json({
                ok: false,
                msg: 'El rut ya está registrado'
            });
        }
        
        //Obtener el ID del usuario desde el token
        const usuario = req._id;

        //Crear empleado
        const empleado = new Empleado({
            usuario,
            ...req.body});

        //Guardar nuevo empleado
        await empleado.save();

        console.log(empleado);
        res.json({
            ok: true,
            empleado       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }

}

const getEmployee = async (req, res = response) => {
    try {
        //console.log(req.params)
        const empleado = await Empleado.findById(req.params.id);
        
        res.json({
            ok: true,
            empleado            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateEmployee = async(req, res = response) => {
    
    //Desestructurar campos enviados desde la peticion
    const {rut, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Empleado.findById(req.params.id);

        //Si no existe Empleado enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Empleado por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Empleado en la BD
        if (existeDB.rut !== rut){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeRut = await Empleado.findOne({rut});

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

        const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            empleado: empleadoActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteEmployee = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Empleado.findById(req.params.id);

        //Si no existe Empleado enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Empleado por el ID.'
            });
        }

        //console.log(req.params)
        const empleado = await Empleado.findByIdAndDelete(req.params.id);
        
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
    getEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
};