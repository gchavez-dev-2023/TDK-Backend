const Usuario = require('../models/Usuario');

const getUsers = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google ');

    res.json({
        ok: true,
        usuarios            
    });
}

const createUser = async (req, res) => {
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

const getUser = async (req, res) => {
    //console.log(req.params)
    const Usuario = await Usuario.findById(req.params.id);
    res.send(Usuario);
}

const updateUser = async(req, res) => {
    //console.log(req.params)
    const Usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.send({message: 'Usuario Actualizado'});
}

const deleteUser = async (req, res) => {
    //console.log(req.params)
    const Usuario = await Usuario.findByIdAndDelete(req.params.id);
    res.send({message: 'Usuario Eliminado'});
}

module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
};