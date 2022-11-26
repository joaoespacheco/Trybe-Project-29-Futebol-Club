import 'express-async-errors';
import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.get('/validate', authMiddleware, userController.getRole);
router.post('/', userController.login);

export default router;
