import 'express-async-errors';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.post('/', userController.login);

export default router;
