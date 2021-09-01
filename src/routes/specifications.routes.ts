import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.get("/", (request, response) => {
  const specifications = specificationsRepository.list();

  response.json(specifications);
});

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
