const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getLevels, createLevel, getLevel, updateLevel, deleteLevel } = require('../controllers/niveles.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getLevels);

router.post('/', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createLevel);

router.get('/:id', validarJWT, getLevel);

router.put('/:id', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateLevel);
    
router.delete('/:id', validarJWT, deleteLevel);

module.exports = router;
