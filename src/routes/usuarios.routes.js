const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validateNotExistUserByMail, validateExistUserById } = require('../middlewares/validar-existe-modelo');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getUsers);

router.post('/', 
    [
    validarJWT,
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validarCampos,
    validateNotExistUserByMail,
    ]
    , createUser);

router.get('/:id', validarJWT, getUser);

router.put('/:id', 
    [
    validarJWT,
    check('email', 'El email es obligatorio.').isEmail(),
    //check('role', 'El role es obligatorio.').not().isEmpty(),
    validarCampos,
    validateExistUserById,
    validateNotExistUserByMail,
    ]
    , updateUser);
    
router.delete('/:id', 
    [
    validarJWT,
    validateExistUserById,
    ]
    , deleteUser);

module.exports = router;
