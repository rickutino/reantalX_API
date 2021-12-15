import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();

    if (!specifications) {
      throw new AppError("Specification does not exists!");
    }

    return specifications;
  }
}

export { ListSpecificationUseCase };
