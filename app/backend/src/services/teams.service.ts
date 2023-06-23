import TeamsModel from '../database/models/TeamsModel';

class TeamService {
  constructor(private teamsModel: typeof TeamsModel = TeamsModel) {}

  public async getAllTeams(): Promise<{
    success: boolean;
    message: string;
    data: TeamsModel[] | null;
  }> {
    try {
      const teams = await this.teamsModel.findAll();
      return { success: true, message: 'Success', data: teams || null };
    } catch (error) {
      return { success: false, message: 'Failed to fetch teams', data: null };
    }
  }

  public async getOneTeam(
    id: number,
  ): Promise<{ success: boolean; message: string; data: TeamsModel | null }> {
    try {
      const team = await this.teamsModel.findOne({ where: { id } });
      return { success: true, message: 'Success', data: team || null };
    } catch (error) {
      return { success: false, message: 'Failed to fetch team', data: null };
    }
  }
}

export default TeamService;
