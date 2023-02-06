const { Router } = require('express');
const { getFindAll, getFindCollectionDocuments } = require('../controllers/busquedas.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJWT, getFindAll);
router.get('/:tabla/:busqueda', validarJWT, getFindCollectionDocuments);

module.exports = router;