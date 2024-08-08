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

module.exports = {
  getAllMachines,
};
