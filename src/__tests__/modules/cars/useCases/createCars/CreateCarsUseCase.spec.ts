import { CarsRepositoryInMemory } from "@__tests__/modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCars/CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
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

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "description Car",
      daily_rate: 210,
      license_plate: "0066",
      fine_amount: 2180,
      brand: "Toyota",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "description Car",
        daily_rate: 210,
        license_plate: "0066",
        fine_amount: 2180,
        brand: "Toyota",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
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
