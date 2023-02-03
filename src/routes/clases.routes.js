const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getClasses, createClass, getClass, updateClass, deleteClass } = require('../controllers/clases.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getClasses);

router.post('/', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createClass);

router.get('/:id', validarJWT, getClass);

router.put('/:id', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateClass);
    
router.delete('/:id', validarJWT, deleteClass);

module.exports = router;
