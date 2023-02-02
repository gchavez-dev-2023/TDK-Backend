const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //Leer el token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay tojen en la petición'
        });
    }

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req._id = _id;
        next();
    } catch (error) {       
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}

module.exports = { 
    validarJWT
};