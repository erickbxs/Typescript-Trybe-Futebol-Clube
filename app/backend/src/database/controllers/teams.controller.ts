import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.getAllTeams();
    return res.status(200).json(teams);
  }

  public async getOneTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.teamService.getOneTeam(Number(id));
    return res.status(200).json(team);
  }
}

export default TeamController;
