'use strict';
const fs = require('fs');
const path = require('path');
// 20240808013401-seed-machines
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../data/opdb_machine_export.json');
    const machines = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const seenIpdbIds = new Set();
    const machinesData = machines.reduce((acc, machine) => {
      if (seenIpdbIds.has(machine.ipdb_id)) {
        return acc; // Skip duplicates
      }
      seenIpdbIds.add(machine.ipdb_id);

      const primaryImage = machine.images.find((image) => image.primary);

      acc.push({
        opdb_id: machine.opdb_id,
        is_machine:
          machine.is_machine !== undefined ? machine.is_machine : false,
        name: machine.name || '',
        common_name: machine.common_name || '',
        shortname: machine.shortname || '',
        physical_machine:
          machine.physical_machine !== undefined ? machine.physical_machine : 0,
        ipdb_id: machine.ipdb_id,
        manufacture_date: machine.manufacture_date || null,
        manufacturer_id: machine.manufacturer
          ? machine.manufacturer.manufacturer_id
          : null,
        type: machine.type || '',
        display: machine.display || '',
        player_count:
          machine.player_count !== undefined ? machine.player_count : 0,
        features:
          machine.features && machine.features.length
            ? machine.features
            : Sequelize.literal('ARRAY[]::VARCHAR[]'),
        keywords:
          machine.keywords && machine.keywords.length
            ? machine.keywords
            : Sequelize.literal('ARRAY[]::VARCHAR[]'),
        description: machine.description || '',
        opdb_img: primaryImage ? primaryImage.urls.medium : null,
        opdb_img_width: primaryImage ? primaryImage.sizes.medium.width : null,
        opdb_img_height: primaryImage ? primaryImage.sizes.medium.height : null,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return acc;
    }, []);
    await queryInterface.bulkInsert('machines', machinesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('machines', null, {});
  },
};
