const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getSubcriptions, createSubcription, getSubcription, updateSubcription, deleteSubcription } = require('../controllers/suscripciones.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getSubcriptions);

router.post('/', 
    [
    validarJWT,
    check('cliente', 'El cliente es obligatorio.').not().isEmpty(),
    check('clase', 'El clase es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createSubcription);

router.get('/:id', validarJWT, getSubcription);

router.put('/:id', 
    [
    validarJWT,
    check('cliente', 'El Id Cliente debe ser valido.').isMongoId(),
    check('clase', 'El Id Clase debe ser valido.').isMongoId(),
    validarCampos,
    ]
    , updateSubcription);
    
router.delete('/:id', validarJWT, deleteSubcription);

module.exports = router;