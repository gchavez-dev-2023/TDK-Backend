const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getSuscriptions, createSuscription, getSuscription, updateSuscription, deleteSuscription } = require('../controllers/suscripciones.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getSuscriptions);

router.post('/', 
    [
    validarJWT,
    check('cliente', 'El cliente es obligatorio.').not().isEmpty(),
    check('clase', 'El clase es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createSuscription);

router.get('/:id', validarJWT, getSuscription);

router.put('/:id', 
    [
    validarJWT,
    check('cliente', 'El cliente es obligatorio.').not().isEmpty(),
    check('clase', 'El clase es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateSuscription);
    
router.delete('/:id', validarJWT, deleteSuscription);

module.exports = router;
