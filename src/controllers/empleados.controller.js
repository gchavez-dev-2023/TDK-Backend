const { response } = require('express');
const Empleado = require('../models/Empleado');

const getEmployees = async (req, res = response) => {
    const Empleados = await Empleado.find({}, 'rut nombres apellidos fechaNacimiento telefono');
    
    res.json({
        ok: true,
        Empleados            
    });
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
        
        //Crear Empleado
        const Empleado = new Empleado(req.body);

        //Guardar nuevo Empleado
        await Empleado.save();

        console.log(Empleado);
        res.json({
            ok: true,
            Empleado       
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
        const Empleado = await Empleado.findById(req.params.id);
        
        res.json({
            ok: true,
            Empleado            
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

        const EmpleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            Empleado: EmpleadoActualizado     
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
        const Empleado = await Empleado.findByIdAndDelete(req.params.id);
        
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