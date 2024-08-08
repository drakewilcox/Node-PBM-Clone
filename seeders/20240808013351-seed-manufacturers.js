'use strict';
// 20240808013351-seed-manufacturers
const path = require('path');
const fs = require('fs');
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../data/opdb_machine_export.json');
    const machines = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const manufacturers = machines.map((machine) => ({
      id: machine.manufacturer.manufacturer_id,
      name: machine.manufacturer.name,
      full_name: machine.manufacturer.full_name,
      created_at: new Date(),
      updated_at: new Date(),
    }));
    const uniqueManufacturers = Array.from(
      new Map(
        manufacturers.map((manufacturer) => [manufacturer.id, manufacturer])
      ).values()
    );

    await queryInterface.bulkInsert('manufacturers', uniqueManufacturers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('manufacturers', null, {});
  },
};
