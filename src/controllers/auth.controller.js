const bcrypt = require('bcryptjs');
const { response } = require ('express');
const { googleVerify } = require('../helpers/google-verify');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const login = async (req, res = response) => {
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
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

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

        //generar token
        const token = await generarJWT(usuario.id);

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
    login,
    googleSignIn
}