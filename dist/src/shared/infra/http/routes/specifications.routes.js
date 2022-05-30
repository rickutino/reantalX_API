"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationsRoutes = void 0;
var express_1 = require("express");
var CreateSpecificationController_1 = require("@modules/cars/useCases/createSpecification/CreateSpecificationController");
var ListSpecificationController_1 = require("@modules/cars/useCases/ListSpecification/ListSpecificationController");
var ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var specificationsRoutes = express_1.Router();
exports.specificationsRoutes = specificationsRoutes;
var listSpecificationsController = new ListSpecificationController_1.ListSpecificationController();
var createSpecificationController = new CreateSpecificationController_1.CreateSpecificationController();
specificationsRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
specificationsRoutes.get("/", listSpecificationsController.handle);
specificationsRoutes.post("/", ensureAdmin_1.ensureAdmin, createSpecificationController.handle);
//# sourceMappingURL=specifications.routes.js.map