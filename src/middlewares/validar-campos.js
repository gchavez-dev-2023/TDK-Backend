const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    //Validar los errores de campos definidos en el Router
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    //Continuar el flujo
    next();
}

module.exports = {
    validarCampos
}