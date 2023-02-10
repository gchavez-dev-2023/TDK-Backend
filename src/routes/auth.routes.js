const { Router } = require('express');
const { check } = require('express-validator');
const { signUp, signIn, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/signup', 
    [
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        validarCampos
    ]
    , signUp);

router.post('/signin', 
    [
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        validarCampos
    ]
    , signIn);

router.post('/google', 
[
    check('token', 'El token de google es obligatorio.').not().isEmpty(),
    validarCampos
]
, googleSignIn);
   
router.get('/renew',
    validarJWT,
    renewToken);

module.exports = router;