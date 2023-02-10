const { response } = require ('express');
const Usuario = require('../models/Usuario');
const Clase = require('../models/Clase');
const Academia = require('../models/Academia');
const Categoria = require('../models/Categoria');
const SubCategoria = require('../models/SubCategoria');
const Nivel = require('../models/Nivel');
const Suscripcion = require('../models/Suscripcion');

const getFindAll = async(req, res = response ) => {
    
    try {
        const buqueda = req.params.busqueda;

        const regex = new RegExp(buqueda, 'i');

        const [ usuarios, clases ] = await Promise.all([
            Usuario.find ({ $or: [ { nombres: regex }, { apellidos: regex }] }),
            Clase.find ({ nombre: regex }).populate('instructor', 'nombre'),
        ]);

        res.json({
            ok: true,
            usuarios,
            clases
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
            case 'usuarios':
                data = await Usuario.find({ $or: [ { nombres: regex }, { apellidos: regex }] });
                break;

            case 'academias':
                data = await Academia.find({ nombre: regex });
                break;

            case 'categorias':
                data = await Categoria.find({ nombre: regex });
                break;

            case 'subcategorias':
                data = await SubCategoria.find({ nombre: regex });
                break;

            case 'nivel':
                data = await Nivel.find({ nombre: regex });
                break;

            case 'clases':
                data = await Clase.find({ nombre: regex }).populate('instructor', 'nombre');
                break;

            case 'suscripciones':
                data = await Suscripcion.find({ nombre: regex }).populate('instructor', 'nombre');
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla debe tener tipo correcto'       
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