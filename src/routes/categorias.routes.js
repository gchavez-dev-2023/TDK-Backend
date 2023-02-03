const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getCategories, createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categorias.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getCategories);

router.post('/', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , createCategory);

router.get('/:id', validarJWT, getCategory);

router.put('/:id', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateCategory);
    
router.delete('/:id', validarJWT, deleteCategory);

module.exports = router;
