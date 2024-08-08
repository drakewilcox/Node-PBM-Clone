const db = require('../models');

const getAllMachines = async () => {
  try {
    return await db.Machine.findAll({
      include: [{ model: db.Manufacturer, as: 'manufacturer' }],
    });
  } catch (err) {
    throw new Error('Error fetching machines: ' + err.message);
  }
};

const getMachineById = async (id) => {
  try {
    const machine = await db.Machine.findByPk(id, {
      include: [{ model: db.Manufacturer, as: 'manufacturer' }],
    });
    if (!machine) {
      throw new Error('Machine not found');
    }
    return machine;
  } catch (err) {
    throw new Error('Error fetching machine: ' + err.message);
  }
};

module.exports = {
  getAllMachines,
  getMachineById,
};
