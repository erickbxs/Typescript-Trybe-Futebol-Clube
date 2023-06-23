import { QueryInterface, DataTypes, Model } from "sequelize";
import { Teams } from "../../Interfaces/teams/Teams.interface";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable<Model<Teams>>("teams", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "team_name",
      },
    });
  },

  down: async (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes
  ) => {
    await queryInterface.dropTable("teams");
  },
};
