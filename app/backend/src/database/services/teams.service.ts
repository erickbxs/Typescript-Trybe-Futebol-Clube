import TeamsModel from '../models/TeamsModel';

class TeamService {
  constructor(private teamsModel: typeof TeamsModel = TeamsModel) {}

  public async getAllTeams(): Promise<TeamsModel[] | null> {
    try {
      return await this.teamsModel.findAll();
    } catch (error) {
      return null;
    }
  }

  public async getOneTeam(id: number): Promise<TeamsModel | null> {
    try {
      return await this.teamsModel.findOne({ where: { id } });
    } catch (error) {
      return null;
    }
  }
}

export default TeamService;
