module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'team_name',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('teams');
  },
};
