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

exports.searchMachinesByName = async (req, res) => {
  try {
    console.log(req.query.q);
    const searchQuery = req.query.q; // Get the search query from the query string
    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query (q) is required' });
    }

    const machines = await machineService.searchMachinesByName(searchQuery);
    if (machines.length === 0) {
      return res.status(404).json({ message: 'No machines found' });
    }
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
