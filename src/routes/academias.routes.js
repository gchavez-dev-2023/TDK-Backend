const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getAcademies, createAcademy, getAcademy, updateAcademy, deleteAcademy } = require('../controllers/academias.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getAcademies);

router.post('/', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createAcademy);

router.get('/:id', validarJWT, getAcademy);

router.put('/:id', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateAcademy);
    
router.delete('/:id', validarJWT, deleteAcademy);

module.exports = router;
