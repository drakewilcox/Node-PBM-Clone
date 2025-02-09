const express = require('express');
const router = express.Router();
const machinesController = require('../../controllers/machinesController');

router.route('/').get(machinesController.getAllMachines);
router.get('/search', machinesController.searchMachinesByName);
router.get('/:id', machinesController.getMachineById);
module.exports = router;
