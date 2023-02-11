const { aggregate } = require("../models/Rol");
const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");

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

const validateRoleRankByIdUser = async (req, res = response, next) => {    
    //Desestructurar el body
    const { roles } = req.body;
    const idRoles = roles;

    try {
        //TODO: agregar validacion para cuando se modifiquen, que primero se rescate valor de usuario.
        //console.log('id.token -> ', req._id);
        //Buscar por BY = ID de Token
        const usuarioToken = await Usuario.findById(req._id).populate('roles', 'jerarquia');
        const rolesUsuario = await Rol.find({_id: {$in: idRoles}});
        
        const { roles } = usuarioToken;
        const rolesUsuarioToken = roles;
        /*
        console.log('idRoles -> ', idRoles);
        console.log('usuarioToken -> ', usuarioToken);
        console.log('rolesUsuario -> ', rolesUsuario);
        console.log('rolesUsuarioToken -> ', rolesUsuarioToken);
        */

        //Verificar si usuario posee roles
        if ( ( ( rolesUsuario ) && ( rolesUsuarioToken ) 
               //&&
               //( rolesUsuario.fi > 0 ) && (rolesUsuarioToken.count() > 0) 
               //&& 
               //( Math.max(...req.usuario.rol.jerarquia) > Math.max(...rol) ) 
               && ( Math.max(...rolesUsuarioToken.map(({ jerarquia }) => jerarquia)) <=
                    Math.max(...rolesUsuario.map(({ jerarquia }) => jerarquia))
                  )
               ) ) {
            //Ejemplo de como extraer maximo de los roles
            /*
            const peaks = rolesUsuarioToken
            max = Math.max(...peaks.map(({ jerarquia }) => jerarquia)),
            object = peaks.find(({ jerarquia }) => jerarquia === max);
    
            console.log(max);
            console.log(object);
            */

            //const maxUT = Math.max(...rolesUsuarioToken.map(({ jerarquia }) => jerarquia));
            //const maxU = Math.max(...rolesUsuario.map(({ jerarquia }) => jerarquia));

            //console.log('maxUT', maxUT);
            //console.log('maxU', maxU);
           
            return res.status(404).json({
                ok: false,
                msg: 'No posee el rol necesario para realizar esta acción.'
            });

        }
        
        /*return res.status(404).json({
            ok: false,
            msg: 'Todo ok.'
        });*/

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
    validateNotExistUserByMail,
    validateNotExistUserByRut,
    validateExistUserById,
    validateRoleRankByIdUser
}