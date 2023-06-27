import { Router } from 'express';
import HomeController from '../controllers/home.controller';

const router = Router();

router.get('/home', (req, res) => new HomeController().getHomeBoard(req, res));

router.get('/away', (req, res) => new HomeController().getHomeBoard(req, res));

export default router;
