const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { getClients, createClient, getClient, updateClient, deleteClient } = require('../controllers/clientes.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
//CRUD
// create - read - update - delete

router.get('/', validarJWT, getClients);

router.post('/', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    validarCampos,
    ]
    , createClient);

router.get('/:id', validarJWT, getClient);

router.put('/:id', 
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('role', 'El role es obligatorio.').not().isEmpty(),
    validarCampos,
    ]
    , updateClient);
    
router.delete('/:id', validarJWT, deleteClient);

module.exports = router;
