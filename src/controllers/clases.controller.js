const { response } = require('express');
const Clase = require('../models/Clase');

const getClasses = async (req, res = response) => {
    const Clases = await Clase.find({}, 'nombre descripcion fechaInicio fechaFin');

    res.json({
        ok: true,
        Clases            
    });
}

const createClass = async (req, res = response) => {
    //Desestructurar el body
    const {nombre, descripcion, fechaInicio, fechaFin} = req.body;

    try {
        //Buscar por nombre = nombre
        const existeNombre = await Clase.findOne({ nombre });

        //Si existe nombre enviar error
        if ( existeNombre ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya está registrado'
            });
        }
        
        //Crear Clase
        const Clase = new Clase(req.body);

        //Guardar nuevo Clase
        await Clase.save();

        console.log(Clase);
        res.json({
            ok: true,
            Clase       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const getClass = async (req, res = response) => {
    //console.log(req.params)
    const Clase = await Clase.findById(req.params.id);
    res.send(Clase);
}

const updateClass = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {nombre, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Clase.findById(req.params.id);

        //Si no existe Clase enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Clase por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Clase en la BD
        if (existeDB.nombre !== nombre){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeNombre = await Clase.findOne({nombre});

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

        const ClaseActualizado = await Clase.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            Clase: ClaseActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteClass = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Clase.findById(req.params.id);

        //Si no existe Clase enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Clase por el ID.'
            });
        }

        //console.log(req.params)
        const Clase = await Clase.findByIdAndDelete(req.params.id);
        
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
    getClasses,
    createClass,
    getClass,
    updateClass,
    deleteClass
};