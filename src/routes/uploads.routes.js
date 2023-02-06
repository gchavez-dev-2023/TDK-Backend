const { Router } = require('express');
const { fileUpload } = require('../controllers/uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require ('express-fileupload');
const router = Router();

//Configuracion para utilizar el upload de imagen de express
router.use(expressFileUpload());

router.put('/:tipo/:id' //, validarJWT
, fileUpload );

module.exports = router;