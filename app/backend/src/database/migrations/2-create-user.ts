import { QueryInterface, Model, DataTypes } from 'sequelize';
import { User } from '../../Interfaces/user/User.interface';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<User>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('users');
  },
};