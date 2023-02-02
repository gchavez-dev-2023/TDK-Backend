const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/usuarios.controller');
//CRUD
// create - read - update - delete

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;