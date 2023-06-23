import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const router = Router();
const teamController = new TeamController();

router.get('/', (req, res) => teamController.getAllTeams(req, res));
router.get('/:id', (req, res) => teamController.getOneTeam(req, res));

export default router;
