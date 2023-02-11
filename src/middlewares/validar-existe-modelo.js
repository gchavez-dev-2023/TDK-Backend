const { aggregate } = require("../models/Rol");
const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");

const validateExistUserById = async (req, res = response, next) => {    
    try {
        //Buscar por BY = ID
        const usuario = await Usuario.findById(req.params.id).populate('roles', 'jerarquia');

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
        return res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }

    //Continuar el flujo
    next();
}

const validateNotExistUserByMail = async (req, res = response, next) => {
    
    //console.log('validateNotExistUserByMail -> req.body', req.body);
    //Desestructurar el body
    const { email, usuario } = req.body;
    //console.log('email', email);
    //console.log('usuario', usuario);    
    
    try {
        if( ( !usuario ) || ( usuario.email !== email ) ){
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
        return res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }    

    //Continuar el flujo
    next();
}

const validateNotExistUserByRut = async (req, res = response, next) => {
    //Desestructurar el body
    const { rut, usuario } = req.body;
    
    try {
        if( ( !usuario ) || ( usuario.rut !== rut ) ){
            //Buscar por rut = rut
            const usuario = await Usuario.findOne({ rut });
    
            //Si existe rut enviar error
            if ( usuario ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El rut ya está registrado'
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }    

    //Continuar el flujo
    next();
}

const validateRoleRankUserActions = async (req, res = response, next) => {    
    //Desestructurar el body
    const { roles, usuario } = req.body;
    const idRoles = roles;

    try {
        //Buscar rol de usuario Token
        const usuarioToken = await Usuario.findById(req._id).populate('roles', 'jerarquia');        
        const { roles } = usuarioToken;
        const rolesUsuarioToken = roles;

        //Verificar maxima jerarquia relacionado al usuario del token
        let jerarquiaUsuarioToken;
        if ( !rolesUsuarioToken ){            
            return res.status(401).json({
                ok: false,
                msg: 'No posee rol, contacte con administrador.'
            });
        }else{
            jerarquiaUsuarioToken = Math.max(...rolesUsuarioToken.map(({ jerarquia }) => jerarquia));
            req.jerarquiaUsuarioToken = jerarquiaUsuarioToken;
        }

        let jerarquiaUsuario;
        
        //Buscar rol del usuario Nuevo
        const rolesUsuarioNuevo = await Rol.find({_id: {$in: idRoles}});
        //Verificar jeraquia (insert/update)
        if ( rolesUsuarioNuevo ){
            //obtener la maxima jerarquia
            jerarquiaUsuario = Math.max(...rolesUsuarioNuevo.map(({ jerarquia }) => jerarquia));
        }

        //Verificar jerarquia (update/delete)
        if ( usuario ){
            const { roles } = usuario;
            const rolesUsuarioExistente = roles;
            const jerarquiaUsuarioExistente = Math.max(...rolesUsuarioExistente.map(({ jerarquia }) => jerarquia));
            //Validar jerarquia usuarios
            if ( jerarquiaUsuario ){
                if ( jerarquiaUsuarioExistente > jerarquiaUsuario ){
                    jerarquiaUsuario = jerarquiaUsuarioExistente;
                }
            }else{
                jerarquiaUsuario = jerarquiaUsuarioExistente;
            }            
        }

        //Verificar si usuario posee roles
        if ( ( jerarquiaUsuario ) && ( jerarquiaUsuarioToken <= jerarquiaUsuario ) ){           
            return res.status(401).json({
                ok: false,
                msg: 'No posee el rol necesario para realizar esta acción.'
            });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error insperado... revisar logs'       
        });
    }    

    //Continuar el flujo
    next();
}

module.exports = {
    validateExistUserById,
    validateNotExistUserByMail,
    validateNotExistUserByRut,
    validateRoleRankUserActions
}