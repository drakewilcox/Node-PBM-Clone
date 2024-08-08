const express = require('express');
const router = express.Router();
const machinesController = require('../../controllers/machinesController');

router.route('/').get(machinesController.getAllMachines);

module.exports = router;
