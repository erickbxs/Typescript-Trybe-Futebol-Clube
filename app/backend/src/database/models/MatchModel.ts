import {
  DataTypes,
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchModel extends Model<
InferAttributes<MatchModel>,
InferCreationAttributes<MatchModel>
> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

MatchModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'home_team_id',
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'away_team_id',
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

MatchModel.belongsTo(TeamsModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
MatchModel.belongsTo(TeamsModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

TeamsModel.hasMany(MatchModel, {
  foreignKey: 'homeTeamId',
  as: 'homeMatch',
});
TeamsModel.hasMany(MatchModel, {
  foreignKey: 'awayTeamId',
  as: 'awayMatch',
});

export default MatchModel;
