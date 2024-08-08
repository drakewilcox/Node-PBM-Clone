const machineService = require('../services/machineService');

exports.getAllMachines = async (req, res) => {
  try {
    const machines = await machineService.getAllMachines();
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
