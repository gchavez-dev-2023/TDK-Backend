const { response } = require('express');
const Categoria = require('../models/Categoria');

const getCategories = async (req, res = response) => {
    const Categorias = await Categoria.find({}, 'nombre descripcion');

    res.json({
        ok: true,
        Categorias            
    });
}

const createCategory = async (req, res = response) => {
    //Desestructurar el body
    const {nombre, descripcion} = req.body;

    try {
        //Buscar por nombre = nombre
        const existeNombre = await Categoria.findOne({ nombre });

        //Si existe nombre enviar error
        if ( existeNombre ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya está registrado'
            });
        }
        
        //Crear Categoria
        const Categoria = new Categoria(req.body);

        //Guardar nuevo Categoria
        await Categoria.save();

        console.log(Categoria);
        res.json({
            ok: true,
            Categoria       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const getCategory = async (req, res = response) => {
    //console.log(req.params)
    const Categoria = await Categoria.findById(req.params.id);
    res.send(Categoria);
}

const updateCategory = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {nombre, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Buscar por BY = ID
        const existeDB = await Categoria.findById(req.params.id);

        //Si no existe Categoria enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Categoria por el ID.'
            });
        }

        //Verificar si email ya no es igual a del Categoria en la BD
        if (existeDB.nombre !== nombre){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeNombre = await Categoria.findOne({nombre});

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

        const CategoriaActualizado = await Categoria.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            Categoria: CategoriaActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteCategory = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Categoria.findById(req.params.id);

        //Si no existe Categoria enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Categoria por el ID.'
            });
        }

        //console.log(req.params)
        const Categoria = await Categoria.findByIdAndDelete(req.params.id);
        
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
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};