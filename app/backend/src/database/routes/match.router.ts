import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import validateMatches from '../middlewares/validateMatches';
import validateToken from '../middlewares/validateToken';

const router = Router();

const matchController = new MatchController();

router.post(
  '/',
  validateToken,
  validateMatches.validateTeam,
  (req, res) => matchController.createMatch(req, res),
);

router.get('/', (req, res) => matchController.getMatches(req, res));

router.patch('/:id/finish', validateToken, (req, res) =>
  matchController.updateMatch(req, res));

router.patch('/:id', validateToken, (req, res) => matchController.updateResult(req, res));

export default router;
