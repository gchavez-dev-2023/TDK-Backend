const bcrypt = require('bcryptjs');

const encrypt = ( passwordNoEncriptado ) => {
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const passwordEncriptado = bcrypt.hashSync( passwordNoEncriptado, salt );
        return passwordEncriptado;
} ;

const compareEncryptPasswords = ( passwordNoEncriptado, passwordEncriptado ) => {
        return bcrypt.compareSync( passwordNoEncriptado, passwordEncriptado );
} ;

module.exports = {
        encrypt,
        compareEncryptPasswords
} ;