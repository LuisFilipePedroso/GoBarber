import uploadConfig from '@config/upload';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import AuthenticationAssurance from '@modules/users/infra/http/middlewares/AuthenticationAssurance';
import { Router } from 'express';
import multer from 'multer';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  AuthenticationAssurance,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
