import { NextFunction, Request, Response } from 'express';
import TeamsModel from '../models/TeamsModel';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const homeTeamName = await TeamsModel.findOne({ where: { id: homeTeam } });
  const awayTeamName = await TeamsModel.findOne({ where: { id: awayTeam } });

  if (!homeTeamName || !awayTeamName) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }
  next();
};

export default { validateTeam, validateMatch };
