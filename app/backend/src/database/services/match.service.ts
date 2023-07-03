import MatchModel from '../models/MatchModel';
import teamModel from '../models/TeamsModel';
import { Matches } from '../../Interfaces/matches/Matches.interface';
import { NewMatch } from '../../Interfaces/matches/NewMatch.interface';

class MatchService {
  constructor(private matchModel: typeof MatchModel = MatchModel) {}

  public async createMatch(match: NewMatch) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;

    const createdMatch = await this.matchModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return createdMatch;
  }

  public async getMatches() {
    const matches = await this.matchModel.findAll({
      include: [
        {
          model: teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  public async getMatchesInProgress(inProgress?: boolean): Promise<Matches[]> {
    const whereClause = inProgress !== undefined ? { inProgress } : {};
    const matches = await this.matchModel.findAll({
      where: whereClause,
      include: [
        {
          model: teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      attributes: { exclude: ['homeTeamId', 'awayTeamId'] },
    });

    return matches.map((match: MatchModel) => match.toJSON()) as Matches[];
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
