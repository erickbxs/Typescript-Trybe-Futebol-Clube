import TeamsModel from '../models/TeamsModel';

class TeamService {
  constructor(private teamsModel: typeof TeamsModel = TeamsModel) {}

  public async getAllTeams(): Promise<{
    data: TeamsModel[] | null;
  }> {
    try {
      const teams = await this.teamsModel.findAll();
      return { data: teams || null };
    } catch (error) {
      return { data: null };
    }
  }

  public async getOneTeam(
    id: number,
  ): Promise<{ data: TeamsModel | null }> {
    try {
      const team = await this.teamsModel.findOne({ where: { id } });
      return { data: team || null };
    } catch (error) {
      return { data: null };
    }
  }
}

export default TeamService;
