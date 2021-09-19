import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specification: Repository<Specification>;

  constructor() {
    this.specification = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specification.create({
      name,
      description,
    });

    await this.specification.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.specification.find();

    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specification.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
