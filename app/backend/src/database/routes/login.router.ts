import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import LoginController from '../controllers/login.controller';
import validateLogin from '../middlewares/validateLogin';

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
