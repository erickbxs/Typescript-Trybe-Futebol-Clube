import { Router } from 'express';
import validateToken from '../database/middlewares/validateToken';
import LoginController from '../database/controllers/login.controller';
import validateLogin from '../database/middlewares/validateLogin';

const router = Router();

const logincontroller = new LoginController();

router.post(
  '/',
  validateLogin.validateEmail,
  validateLogin.validatePassword,
  (req, res) => logincontroller.loginToken(req, res),
);
router.post('/role', validateToken, (req, res) =>
  logincontroller.authToken(req, res));

export default router;
