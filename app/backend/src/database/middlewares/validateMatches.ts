import { NextFunction, Request, Response } from 'express';
import { NewMatch } from '../../Interfaces/matches/NewMatch.interface';

const validateTeam = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const match = req.body as NewMatch;
  const { homeTeamId, awayTeamId } = match;
  if (homeTeamId === awayTeamId) {
    return { status: 422, message: 'It is not possible to create a match with two equal teams' };
  }
  if (!homeTeamId || !awayTeamId) {
    return { status: 404, message: 'There is no team with such id!' };
  }
  next();
};

export default { validateTeam };
