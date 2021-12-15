import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.list(category_id, brand, name);

    if (!cars) {
      throw new AppError("Cars does not exists!");
    }

    return cars;
  }
}

export { ListAvailableCarsUseCase };
