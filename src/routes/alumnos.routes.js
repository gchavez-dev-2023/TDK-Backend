const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getTrainees, createTrainee, getTrainee, updateTrainee, deleteTrainee } = require('../controllers/alumnos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validateNotExistTraineeByMail } = require('../middlewares/validar-existe-modelo');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getTrainees);

router.post('/', 
    [
    validarJWT,
    check('rut', 'El rut es obligatorio.').not().isEmpty(),
    check('nombres', 'El nombre es obligatorio.').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio.').not().isEmpty(),
    validarCampos,
    validateNotExistTraineeByMail
    ]
    , createTrainee);

router.get('/:id', validarJWT, getTrainee);

router.put('/:id', 
    [
    validarJWT,
    check('rut', 'El rut es obligatorio.').not().isEmpty(),
    check('nombres', 'El nombre es obligatorio.').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateTrainee);
    
router.delete('/:id', validarJWT, deleteTrainee);

module.exports = router;
