import { Request, Response } from 'express';
import Match from '../models/MatchModel';
import MatchService from '../services/match.service';
import LoginService from '../services/login.service';

class MatchController {
  constructor(private matchService: MatchService
  = new MatchService(), private loginService: LoginService = new LoginService()) {}

  public async createMatch(req: Request, res: Response) {
    const match = req.body as Match;
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    await this.loginService.verifyToken(authorization);
    const createdMatch = await this.matchService.createMatch(match);

    return res.status(201).json(createdMatch);
  }

  public async getMatches(_req: Request, res: Response) {
    const matches = await this.matchService.getMatches();

    return res.status(200).json(matches);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const updatedMatch = await this.matchService.updateMatch(Number(id));

    if (!updatedMatch) {
      return res.status(401).json({ message: 'Match is not finished' });
    }

    return res.status(200).json({ message: 'Finished' });
  }

  public async updateResult(req: Request, res: Response) {
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals } = req.body;

    const updatedResult = await
    this.matchService.updateResult(Number(id), homeTeamGoals, awayTeamGoals);

    if (!updatedResult) {
      return res.status(401).json({ message: 'Match is not finished' });
    }

    return res.status(200).json({ message: 'Result altered' });
  }
}

export default MatchController;
