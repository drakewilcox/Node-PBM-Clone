const machineService = require('../services/machineService');

exports.getAllMachines = async (req, res) => {
  try {
    const machines = await machineService.getAllMachines();
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMachineById = async (req, res) => {
  try {
    const machine = await machineService.getMachineById(req.params.id);
    res.json(machine);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
