const { response } = require('express');
const Subcripcion = require('../models/Subcripcion');

const getSubcriptions = async (req, res = response) => {
    const Subcripciones = await Subcripcion.find({}, 'cliente clase fechaSuscripcion');

    res.json({
        ok: true,
        Subcripciones            
    });
}

const createSubcription = async (req, res = response) => {
    //Desestructurar el body
    const {cliente, clase, fechaSuscripcion} = req.body;

    try {
        //Buscar por cliente clase = nombre
        const existeSubscripcion = await Subcripcion.findOne({ cliente, clase });

        //Si existe nombre enviar error
        if ( existeSubscripcion ) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente ya está registrado a la clase'
            });
        }
        
        //Crear Subcripcion
        const Subcripcion = new Subcripcion(req.body);

        //Guardar nuevo Subcripcion
        await Subcripcion.save();

        console.log(Subcripcion);
        res.json({
            ok: true,
            Subcripcion       
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
    //console.log(req.params)
    const Subcripcion = await Subcripcion.findById(req.params.id);
    res.send(Subcripcion);
}

const updateSubcription = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {cliente, clase, fechaSuscripcion, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Subcripcion.findById(req.params.id);

        //Si no existe Subcripcion enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Subcripcion por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Subcripcion en la BD
        if (existeDB.cliente !== cliente || existeDB.clase !== clase){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeSubscripcion = await Subcripcion.findOne({cliente, clase});

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

        const SubcripcionActualizado = await Subcripcion.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            Subcripcion: SubcripcionActualizado     
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
        const existeDB = await Subcripcion.findById(req.params.id);

        //Si no existe Subcripcion enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Subcripcion por el ID.'
            });
        }

        //console.log(req.params)
        const Subcripcion = await Subcripcion.findByIdAndDelete(req.params.id);
        
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