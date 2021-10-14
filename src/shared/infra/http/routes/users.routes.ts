import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UploadUserAvatarController } from "@modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import uploadConfig from "../../../../config/upload";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const uploadUserAvatarController = new UploadUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  uploadUserAvatarController.handle
);

export { usersRoutes };
