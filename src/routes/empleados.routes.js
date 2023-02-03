const { Router } = require('express');
const router = Router();

const { getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/empleados.controller');
//CRUD
// create - read - update - delete

router.get('/', getEmployees);
router.post('/', createEmployee);
router.get('/:id', getEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;