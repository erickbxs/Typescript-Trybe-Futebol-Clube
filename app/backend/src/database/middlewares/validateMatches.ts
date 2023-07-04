import { NextFunction, Request, Response } from 'express';
import { NewMatch } from '../../Interfaces/matches/NewMatch.interface';
import TeamService from '../services/teams.service';

const validateTeam = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const teamService: TeamService = new TeamService();
  const match = req.body as NewMatch;
  const { homeTeamId, awayTeamId } = match;
  const homeTeam = await teamService.getOneTeam(Number(homeTeamId));
  const awayTeam = await teamService.getOneTeam(Number(awayTeamId));
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default { validateTeam };
