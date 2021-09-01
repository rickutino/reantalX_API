import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

const specificationRepository = SpecificationsRepository.getInstance();

const listSpecificationUseCase = new ListSpecificationUseCase(
  specificationRepository
);

const listSpecificationsController = new ListSpecificationController(
  listSpecificationUseCase
);

export { listSpecificationsController };
