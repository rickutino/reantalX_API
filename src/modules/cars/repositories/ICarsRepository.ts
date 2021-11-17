import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarTDO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  list(category_id?: string, brand?: string, name?: string): Promise<Car[]>;
}
export { ICarsRepository };
