const { response } = require ('express');
const Alumno = require('../models/Alumno');
const Empleado = require('../models/Empleado');
const Instructor = require('../models/Instructor');

const getFindAll = async(req, res = response ) => {
    
    try {
        const buqueda = req.params.busqueda;

        const regex = new RegExp(buqueda, 'i');

        const [ empleados, instructores, alumnos ] = await Promise.all([
            Empleado.find ({ nombre: regex }).populate('usuario', 'nombre'),
            Instructor.find ({ nombre: regex }).populate('usuario', 'nombre'),
            Alumno.find ({ nombre: regex }).populate('usuario', 'nombre')
        ]);

        res.json({
            ok: true,
            empleados,
            instructores,
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

const getFindCollectionDocuments = async(req, res = response ) => {
    
    try {
        const tabla = req.params.tabla;
        const buqueda = req.params.busqueda;

        const regex = new RegExp(buqueda, 'i');

        let data = [];

        switch (tabla) {
            case 'empleados':
                data = await Empleado.find({ nombre: regex }).populate('usuario', 'nombre');
                break;

            case 'instructores':
                data = await Instructor.find({ nombre: regex }).populate('usuario', 'nombre');
                break;

            case 'alumnos':
                data = await Alumno.find({ nombre: regex }).populate('usuario', 'nombre');
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla debe ser empleados, instructores, alumnos'       
                });
        }
        
        res.json({
            ok: true,
            data
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
    getFindAll,
    getFindCollectionDocuments
}