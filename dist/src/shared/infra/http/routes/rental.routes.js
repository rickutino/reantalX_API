"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalsRoutes = void 0;
var express_1 = require("express");
var CreateRentalController_1 = require("@modules/rentals/useCases/createRental/CreateRentalController");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var DevolutionRentalController_1 = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalController");
var rentalsRoutes = express_1.Router();
exports.rentalsRoutes = rentalsRoutes;
var createRentalController = new CreateRentalController_1.CreateRentalController();
var devolutionRentalController = new DevolutionRentalController_1.DevolutionRentalController();
rentalsRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", ensureAuthenticated_1.ensureAuthenticated, devolutionRentalController.handle);
//# sourceMappingURL=rental.routes.js.map