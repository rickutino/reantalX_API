import { CreateCarUseCase } from "@modules/cars/useCases/createCars/CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";

let createCarsUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarsUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarsUseCase.execute({
      name: "Tesla",
      description: "description Car",
      daily_rate: 210,
      license_plate: "0066",
      fine_amount: 2180,
      brand: "Toyota",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarsUseCase.execute({
        name: "Car1",
        description: "description Car",
        daily_rate: 210,
        license_plate: "0066",
        fine_amount: 2180,
        brand: "Toyota",
        category_id: "category",
      });

      await createCarsUseCase.execute({
        name: "Car2",
        description: "description Car",
        daily_rate: 210,
        license_plate: "0066",
        fine_amount: 2180,
        brand: "Toyota",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car 3",
      description: "description Car",
      daily_rate: 210,
      license_plate: "0066",
      fine_amount: 2180,
      brand: "Toyota",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
