import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import LoginController from '../controllers/login.controller';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

const logincontroller = new LoginController();

router.post(
  '/',
  validateLogin,
  (req, res) => logincontroller.loginToken(req, res),
);
router.get('/role', validateToken, (req, res) =>
  logincontroller.authToken(req, res));

export default router;
