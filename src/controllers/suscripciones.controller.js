const { response } = require('express');
const Suscripcion = require('../models/Suscripcion');

const getSubcriptions = async (req, res = response) => {
    const Suscripciones = await Suscripcion.find({}, 'cliente clase fechaSuscripcion');

    res.json({
        ok: true,
        Suscripciones            
    });
}

const createSubcription = async (req, res = response) => {
    //Desestructurar el body
    const {cliente, clase, fechaSuscripcion} = req.body;

    try {
        //Buscar por cliente clase = nombre
        const existeSubscripcion = await Suscripcion.findOne({ cliente, clase });

        //Si existe nombre enviar error
        if ( existeSubscripcion ) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente ya está registrado a la clase'
            });
        }
        
        //Crear Suscripcion
        const Suscripcion = new Suscripcion(req.body);

        //Guardar nuevo Suscripcion
        await Suscripcion.save();

        console.log(Suscripcion);
        res.json({
            ok: true,
            Suscripcion       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const getSubcription = async (req, res = response) => {
    try {
        //console.log(req.params)
        const Suscripcion = await Suscripcion.findById(req.params.id);
        
        res.json({
            ok: true,
            Suscripcion            
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateSubcription = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {cliente, clase, fechaSuscripcion, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Suscripcion.findById(req.params.id);

        //Si no existe Suscripcion enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Suscripcion por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Suscripcion en la BD
        if (existeDB.cliente !== cliente || existeDB.clase !== clase){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeSubscripcion = await Suscripcion.findOne({cliente, clase});

            //Si existe se responde error
            if (existeSubscripcion){
                return res.status(400).json({
                    ok: false,
                    msg: 'El cliente ya está registrado a la clase'
                });
            }
            //Agregar el cliente y clase a los campos a actualizar
            campos.cliente = cliente;
            campos.clase = clase;
        }

        const SuscripcionActualizado = await Suscripcion.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            Suscripcion: SuscripcionActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteSubcription = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Suscripcion.findById(req.params.id);

        //Si no existe Suscripcion enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Suscripcion por el ID.'
            });
        }

        //console.log(req.params)
        const Suscripcion = await Suscripcion.findByIdAndDelete(req.params.id);
        
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
    getSubcriptions,
    createSubcription,
    getSubcription,
    updateSubcription,
    deleteSubcription
};