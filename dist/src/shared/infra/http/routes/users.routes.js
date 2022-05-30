"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var CreateUserController_1 = require("@modules/accounts/useCases/createUser/CreateUserController");
var UploadUserAvatarController_1 = require("@modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarController");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var upload_1 = __importDefault(require("../../../../config/upload"));
var usersRoutes = express_1.Router();
exports.usersRoutes = usersRoutes;
var uploadAvatar = multer_1.default(upload_1.default.upload("./tmp/avatar"));
var createUserController = new CreateUserController_1.CreateUserController();
var uploadUserAvatarController = new UploadUserAvatarController_1.UploadUserAvatarController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticated_1.ensureAuthenticated, uploadAvatar.single("avatar"), uploadUserAvatarController.handle);
//# sourceMappingURL=users.routes.js.map