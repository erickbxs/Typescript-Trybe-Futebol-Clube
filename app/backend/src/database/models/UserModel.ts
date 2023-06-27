import {
  DataTypes,
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class UserModel extends Model<
InferAttributes<UserModel>,
InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<number>;

  declare email: string;

  declare password: string;

  declare username: string;

  declare role: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

export default UserModel;
