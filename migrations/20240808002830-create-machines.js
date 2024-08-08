'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('machines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      opdb_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      is_machine: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      common_name: {
        type: Sequelize.STRING,
      },
      shortname: {
        type: Sequelize.STRING,
      },
      physical_machine: {
        type: Sequelize.INTEGER,
      },
      ipdb_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      manufacture_date: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.STRING,
      },
      display: {
        type: Sequelize.STRING,
      },
      player_count: {
        type: Sequelize.INTEGER,
      },
      features: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },
      keywords: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      opdb_img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      opdb_img_width: {
        type: Sequelize.INTEGER,
      },
      opdb_img_height: {
        type: Sequelize.INTEGER,
      },
      manufacturer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'manufacturers',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('machines');
  },
};
