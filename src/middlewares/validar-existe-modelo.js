const Alumno = require("../models/Alumno");
const Usuario = require("../models/Usuario");


const validateNotExistUserByMail = async (req, res = response, next) => {
    //Desestructurar el body
    const {email} = req.body;
    
    try {
        if( ( !req.usuario.email ) || ( req.usuario.email !== email ) ){
            //Buscar por email = email
            const usuario = await Usuario.findOne({ email });
    
            //Si existe correo enviar error
            if ( usuario ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }    

    //Continuar el flujo
    next();
}

const validateExistUserById = async (req, res = response, next) => {
    
    //Desestructurar el body
    const {email} = req.body;
    
    try {
        //Buscar por BY = ID
        const usuario = await Usuario.findById(req.params.id);

        //Si no existe usuario enviar error
        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Usuario por el ID.'
            });
        }
        req.usuario = usuario;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }

    //Continuar el flujo
    next();
}

const validateNotExistTraineeByMail = async (req, res = response, next) => {
    //Desestructurar el body
    const {rut} = req.body;
    
    try {
        if( ( !req.alumno.rut ) || ( req.alumno.rut !== rut ) ){
            //Buscar por rut = rut
            const alumno = await Alumno.findOne({ rut });
    
            //Si existe correo enviar error
            if ( alumno ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El rut ya está registrado'
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }    

    //Continuar el flujo
    next();
}

module.exports = {
    validateNotExistUserByMail,
    validateExistUserById,
    validateNotExistTraineeByMail
}