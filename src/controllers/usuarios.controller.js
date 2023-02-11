const { response } = require('express');
const { encrypt } = require('../helpers/cifrador');
const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');

const getUsers = async (req, res = response) => {
    const { jerarquiaUsuarioToken } = req;
    try {
        if( !jerarquiaUsuarioToken ){
            //Implementar busqueda por jerarquia 
            const usuarios = await Usuario.find({}, 'email roles google rut nombres apellidos fechaNacimiento telefono img').populate('roles','nombre');
        }else{
            const usuarios = await Usuario.find({}, 'email roles google rut nombres apellidos fechaNacimiento telefono img').populate('roles','nombre');
        }
        res.json({
            ok: true,
            usuarios            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const createUser = async (req, res = response) => {
    //Desestructurar el body
    const {email, password, roles, rut, nombres, apellidos, fechaNacimiento, telefono, img} = req.body;

    try {        
        //Crear usuario
        const usuario = new Usuario(req.body);

        //Encriptar constraseña
        usuario.password = encrypt( password );
        
        //Obtener el ID del usuario desde el token
        usuario.createdByUser = req._id;

        //Verificar si llegan los roles, sino se crean
        if (roles){
            const rolesDB = await Rol.find({_id: {$in: roles}});
            usuario.roles = rolesDB.map(rol => rol._id);
        }else{
            //Setear Rol "alumno" por defecto
            const rol = await Rol.findOne({ nombre: 'alumno'} );
            usuario.roles = [rol._id];
        }

        //Guardar nuevo usuario
        await usuario.save();

        console.log(usuario);
        res.json({
            ok: true,
            usuario       
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }

}

const getUser = async (req, res = response) => {
    try {
        //console.log(req.params)
        const Usuario = await Usuario.findById(req.params.id);
        
        res.json({
            ok: true,
            Usuario            
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const updateUser = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {password, google, ...campos } = req.body;

    //console.log(req.params)
    try {
        //Obtener el ID del usuario desde el token
        campos.updatedByUser = req._id;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, campos);

        res.json({
            ok: true,
            usuario: usuarioActualizado     
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }
}

const deleteUser = async (req, res = response) => {
    try {
        //Buscar por BY = ID
        const existeDB = await Usuario.findById(req.params.id);

        //Si no existe usuario enviar error
        if ( !existeDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Usuario por el ID.'
            });
        }

        //console.log(req.params)
        const Usuario = await Usuario.findByIdAndDelete(req.params.id);
        
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
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
};