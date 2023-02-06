const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/empleados.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getEmployees);

router.post('/',
    [
    validarJWT,
    check('rut', 'El rut es obligatorio.').not().isEmpty(),
    check('nombres', 'El nombre es obligatorio.').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createEmployee);

router.get('/:id', validarJWT, getEmployee);

router.put('/:id', 
    [
    validarJWT,
    check('rut', 'El rut es obligatorio.').not().isEmpty(),
    check('nombres', 'El nombre es obligatorio.').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateEmployee);
    
router.delete('/:id', validarJWT, deleteEmployee);

module.exports = router;