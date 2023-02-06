const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getInstructors, createInstructor, getInstructor, updateInstructor, deleteInstructor } = require('../controllers/instructores.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getInstructors);

router.post('/', 
    [
    validarJWT,
    check('rut', 'El rut es obligatorio.').not().isEmpty(),
    check('nombres', 'El nombre es obligatorio.').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createInstructor);

router.get('/:id', validarJWT, getInstructor);

router.put('/:id', 
    [
    validarJWT,
    check('rut', 'El rut es obligatorio.').not().isEmpty(),
    check('nombres', 'El nombre es obligatorio.').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateInstructor);
    
router.delete('/:id', validarJWT, deleteInstructor);

module.exports = router;
