const { encrypt, compareEncryptPasswords } = require('../helpers/cifrador');
const { response } = require ('express');
const { googleVerify } = require('../helpers/google-verify');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');

const signUp = async (req, res = response) => {
    //Desestructurar el body
    const {email, password, roles} = req.body;

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

        //Verificar si llegan los roles, sino se crean
        /*if (roles){
            const rolesDB = await Rol.find({name: {$in: roles}});
            usuario.roles = rolesDB.map(rol => rol._id);
        }else{
            //Setear Rol "alumno" por defecto
            const rol = await Rol.findOne({ nombre: 'alumno'} );
            usuario.roles = [rol._id];
        }*/

        //Setear Rol "alumno" por defecto
        const rol = await Rol.findOne({ nombre: 'alumno'} );
        usuario.roles = [rol._id];

        //Encriptar constraseña
        usuario.password = encrypt( password );

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

const signIn = async (req, res = response) => {
    //Desestructurar el body
    const {email, password} = req.body;

    try {
        
        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        //Si no existe usuario enviar error
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario/Contreseña invalida'
            });
        }

        //Verificar contraseña
        const validPassword = compareEncryptPasswords(password, usuarioDB.password);

        if (!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario/Contreseña invalida'
            });
        }

        //generar token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token            
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
        
    }
}

const googleSignIn = async (req, res = response) => {
    try {
        const { email, name, picture} = await googleVerify( req.body.token );

        //Verificar si hay usuario creado
        const usuarioExiste = await Usuario.findOne({ email });

        let usuario;
        //Si no existe, crearlo con datos de Google
        if (!usuarioExiste) {
            usuario = new Usuario({
                //nombre : name,
                email,
                password: '@@@',
                //img: picture,
                google: true
            });
        }else{ //Si existe, actualizar datos
            usuario = usuarioExiste;
            usuario.google = true;
            usuario.password = '@@@';
            usuario.google = true;
            //usuario.img = picture;
        }

        //Guardar usuario
        await usuario.save();

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
        
    }
}

const renewToken = async (req, res = response) => {
    try {
        const id = req._id;

        //generar token
        const token = await generarJWT(id);


        res.json({
            ok: true,
            token
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
    signUp,
    signIn,
    googleSignIn,
    renewToken
};