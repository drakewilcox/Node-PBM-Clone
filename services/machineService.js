const db = require('../models');
const { Op } = require('sequelize');

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

const searchMachinesByName = async (searchQuery) => {
  try {
    // Split the query into words and map them for partial matching
    const searchTerms = searchQuery.split(' ').map((term) => `%${term}%`);

    return await db.Machine.findAll({
      where: {
        // Use Op.and to ensure all words must match somewhere in the name
        [Op.and]: searchTerms.map((term) => ({
          name: {
            [Op.iLike]: term, // Case-insensitive search
          },
        })),
      },
      include: [{ model: db.Manufacturer, as: 'manufacturer' }],
    });
  } catch (err) {
    console.log('SEARCH', searchQuery);
    throw new Error('Error searching machines: ' + err.message);
  }
};

module.exports = {
  getAllMachines,
  getMachineById,
  searchMachinesByName,
};
