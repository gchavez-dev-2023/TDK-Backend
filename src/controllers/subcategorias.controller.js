const { response } = require('express');
const SubCategoria = require('../models/SubCategoria');

const getSubCategories = async (req, res = response) => {
    try {
        const subCategorias = await SubCategoria.find({}, 'nombre descripcion');

        res.json({
            ok: true,
            subCategorias            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createSubCategory = async (req, res = response) => {
    //Desestructurar el body
    const {nombre, descripcion} = req.body;

    try {
        //Buscar por nombre = nombre
        const existeNombre = await SubCategoria.findOne({ nombre });

        //Si existe nombre enviar error
        if ( existeNombre ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya está registrado'
            });
        }
        
        //Obtener el ID del usuario desde el token
        const usuario = req._id;

        //Crear subCategoria
        const subCategoria = new SubCategoria({
            usuario,
            ...req.body});

        //Guardar nuevo subCategoria
        await subCategoria.save();

        console.log(subCategoria);
        res.json({
            ok: true,
            subCategoria       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const getSubCategory = async (req, res = response) => {
    try {
        //console.log(req.params)
        const subCategoria = await SubCategoria.findById(req.params.id);
        
        res.json({
            ok: true,
            subCategoria            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateSubCategory = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {nombre, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await SubCategoria.findById(req.params.id);

        //Si no existe SubCategoria enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe SubCategoria por el ID.'
            });
        }

        //Verificar si email ya no es igual a del SubCategoria en la BD
        if (existeDB.nombre !== nombre){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeNombre = await SubCategoria.findOne({nombre});

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

        const subCategoriaActualizado = await SubCategoria.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            subCategoria: subCategoriaActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteSubCategory = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await SubCategoria.findById(req.params.id);

        //Si no existe SubCategoria enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe SubCategoria por el ID.'
            });
        }

        //console.log(req.params)
        const subCategoria = await SubCategoria.findByIdAndDelete(req.params.id);
        
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
    getSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
};