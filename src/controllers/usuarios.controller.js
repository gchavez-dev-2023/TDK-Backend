const bcrypt = require('bcryptjs');
const { response } = require('express');
const Usuario = require('../models/Usuario');

const getUsers = async (req, res = response) => {
    const usuarios = await Usuario.find({}, 'nombre email role google ');

    res.json({
        ok: true,
        usuarios            
    });
}

const createUser = async (req, res = response) => {
    //Desestructurar el body
    const {email, password, nombre} = req.body;

    try {
        //Buscar por email = email
        const existeMail = await Usuario.findOne({ email });

        //Si existe correo enviar error
        if ( existeMail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        
        //Crear usuario
        const usuario = new Usuario(req.body);

        //Encriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

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
    //console.log(req.params)
    const Usuario = await Usuario.findById(req.params.id);
    res.send(Usuario);
}

const updateUser = async(req, res = response) => {
    //Desestructurar campos enviados desde la peticion
    const {password, google, email, ...campos } = req.body;

    //console.log(req.params)
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

        //Verificar si email ya no es igual a del usuario en la BD
        if (existeDB.email !== email){
            //Verificar si el email nuevo ya se encuentra registrado
            const existeMail = await Usuario.findOne({email});

            //Si existe se responde error
            if (existeMail){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });
            }
            //Agregar el mail a los campos a actualizar
            campos.email = email;
        }

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