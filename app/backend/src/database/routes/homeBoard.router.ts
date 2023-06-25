import { Router } from 'express';
import HomeController from '../controllers/home.controller';

const router = Router();

const homeController = new HomeController();

router.get('/', (req, res) => homeController.getHomeBoard(req, res));

router.get('/home', (req, res) => homeController.getHomeBoard(req, res));

router.get('/away', (req, res) => homeController.getHomeBoard(req, res));

export default router;
