import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/ListSpecification/ListSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationController();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.get("/", listSpecificationsController.handle);

specificationsRoutes.post(
  "/",
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
