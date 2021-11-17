import { CarsRepositoryInMemory } from "@__tests__/modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Prius",
      description: "Hybrid car",
      daily_rate: 21000,
      license_plate: "豊田 210 ひ 0088",
      fine_amount: 5500,
      brand: "Toyota",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Shuttle",
      description: "car",
      daily_rate: 17000,
      license_plate: "なにわ 110 ひ 0088",
      fine_amount: 3800,
      brand: "Honda",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Honda",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "NX350h",
      description: "car2",
      daily_rate: 47000,
      license_plate: "なにわ 110 ひ 1240",
      fine_amount: 10800,
      brand: "Lexus",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "NX350h",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "M8 Cabriolet",
      description: "car",
      daily_rate: 17000,
      license_plate: "なにわ 420 ひ 0088",
      fine_amount: 3800,
      brand: "BMW",
      category_id: "123456748",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456748",
    });

    expect(cars).toEqual([car]);
  });
});
