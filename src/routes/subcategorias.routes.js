const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getSubCategories, createSubCategory, getSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subcategorias.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getSubCategories);

router.post('/', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createSubCategory);

router.get('/:id', validarJWT, getSubCategory);

router.put('/:id', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateSubCategory);
    
router.delete('/:id', validarJWT, deleteSubCategory);

module.exports = router;
