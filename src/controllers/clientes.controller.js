const { response } = require('express');
const Cliente = require('../models/Cliente');

const getClients = async (req, res = response) => {
    try {
        const clientes = await Cliente.find({}, 'rut nombres apellidos fechaNacimiento telefono img');

        res.json({
            ok: true,
            clientes            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createClient = async (req, res = response) => {
    //Desestructurar el body
    const {rut, nombres, apellidos, fechaNacimiento, telefono} = req.body;

    try {
        //Buscar por rut = rut
        const existeRut = await Cliente.findOne({ rut });

        //Si existe rut enviar error
        if ( existeRut ) {
            return res.status(400).json({
                ok: false,
                msg: 'El rut ya está registrado'
            });
        }
        
        //Obtener el ID del usuario desde el token
        const usuario = req._id;

        //Crear cliente
        const cliente = new Cliente({
            usuario,
            ...req.body});

        //Guardar nuevo Cliente
        await cliente.save();

        console.log(cliente);
        res.json({
            ok: true,
            cliente       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }

}

const getClient = async (req, res = response) => {
    try{
        //console.log(req.params)
        const cliente = await Cliente.findById(req.params.id);
        
        res.json({
            ok: true,
            cliente            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateClient = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {rut, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Cliente.findById(req.params.id);

        //Si no existe Cliente enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Cliente por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Cliente en la BD
        if (existeDB.rut !== rut){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeRut = await Cliente.findOne({rut});

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

        const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            cliente: clienteActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteClient = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Cliente.findById(req.params.id);

        //Si no existe Cliente enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Cliente por el ID.'
            });
        }

        //console.log(req.params)
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        
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
    getClients,
    createClient,
    getClient,
    updateClient,
    deleteClient
};