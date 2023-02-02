const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getUsers);

router.post('/', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    validarCampos,
    ]
    , createUser);

router.get('/:id', validarJWT, getUser);

router.put('/:id', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('role', 'El role es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateUser);
router.delete('/:id', validarJWT, deleteUser);

module.exports = router;