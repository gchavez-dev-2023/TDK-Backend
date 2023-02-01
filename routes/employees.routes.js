const { Router } = require('express');
const router = Router();

const employeesCtrl = require('../controllers/employees.controller.js');
//CRUD
// create - read - update - delete

router.get('/', employeesCtrl.getEmployees);
router.post('/', employeesCtrl.createEmployee);
router.get('/:id', employeesCtrl.getEmployee);
router.put('/:id', employeesCtrl.updateEmployee);
router.delete('/:id', employeesCtrl.deleteEmployee);

module.exports = router;