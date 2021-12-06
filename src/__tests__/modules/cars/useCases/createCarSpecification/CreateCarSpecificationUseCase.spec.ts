import { CarsRepositoryInMemory } from "@__tests__/modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@__tests__/modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Tesla",
      description: "description Car",
      daily_rate: 210,
      license_plate: "0066",
      fine_amount: 2180,
      brand: "Toyota",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "Test",
      description: "Test description",
    });

    const specifications_id = [specification.id];

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(1);
  });

  it("should be able to add a new specification to a now-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["5678", "9012"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
