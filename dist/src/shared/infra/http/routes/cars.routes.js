"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var CreateCarController_1 = require("@modules/cars/useCases/createCars/CreateCarController");
var CreateCarSpecificationController_1 = require("@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");
var listAvailableCarsController_1 = require("@modules/cars/useCases/listAvailableCars/listAvailableCarsController");
var UploadCarImagesController_1 = require("@modules/cars/useCases/uploadCarImages/UploadCarImagesController");
var ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var carsRoutes = express_1.Router();
exports.carsRoutes = carsRoutes;
var createCarController = new CreateCarController_1.CreateCarController();
var listAvailableCarsController = new listAvailableCarsController_1.ListAvailableCarsController();
var createCarSpecificationController = new CreateCarSpecificationController_1.CreateCarSpecificationController();
var uploadCarImagesController = new UploadCarImagesController_1.UploadCarImagesController();
var upload = multer_1.default(upload_1.default.upload("./tmp/cars"));
carsRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.array("images"), uploadCarImagesController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarSpecificationController.handle);
//# sourceMappingURL=cars.routes.js.map