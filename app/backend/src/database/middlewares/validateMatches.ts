import { NextFunction, Request, Response } from 'express';
import TeamsModel from '../models/TeamsModel';

const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const homeTeamName = await TeamsModel.findOne({ where: { id: homeTeamId } });
  const awayTeamName = await TeamsModel.findOne({ where: { id: awayTeamId } });

  if (!homeTeamName || !awayTeamName) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default { validateTeam };
