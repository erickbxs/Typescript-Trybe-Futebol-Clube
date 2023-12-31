import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import LoginService from '../services/login.service';
import { Matches } from '../../Interfaces/matches/Matches.interface';
import { NewMatch } from '../../Interfaces/matches/NewMatch.interface';

class MatchController {
  constructor(
    private matchService: MatchService = new MatchService(),
    private loginService: LoginService = new LoginService(),
  ) {}

  public async createMatch(req: Request, res: Response) {
    const match = req.body as NewMatch;
    // const { authorization } = req.headers;

    // if (!authorization) {
    //   return res.status(401).json({ message: 'Token must be a valid token' });
    // }

    try {
      // await this.loginService.verifyToken(authorization);
      const createdMatch = await this.matchService.createMatch(match);

      return res.status(201).json(createdMatch);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
    }
  }

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let matches: Matches[];

    if (inProgress === 'true' || inProgress === 'false') {
      matches = await this.matchService.getMatchesInProgress(
        inProgress === 'true',
      );
    } else {
      matches = await this.matchService.getMatchesInProgress();
    }

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

    const updatedResult = await this.matchService.updateResult(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );

    if (!updatedResult) {
      return res.status(401).json({ message: 'Match is not finished' });
    }

    return res.status(200).json({ message: 'Result altered' });
  }
}

export default MatchController;
