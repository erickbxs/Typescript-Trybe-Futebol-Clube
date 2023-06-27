import MatchModel from '../models/MatchModel';
import Team from '../models/TeamsModel';

class MatchService {
  constructor(private matchModel: typeof MatchModel = MatchModel) {}

  public async createMatch(match: MatchModel) {
    const createdMatch = await this.matchModel.create(match);
    return createdMatch;
  }

  public async getMatches() {
    const matches = await this.matchModel.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  public async getMatchesInProgress(inProgress: boolean) {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  public async updateMatch(id: number) {
    const updatedMatch = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return updatedMatch;
  }

  public async updateResult(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const updatedMatch = await this.matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return updatedMatch;
  }
}

export default MatchService;
