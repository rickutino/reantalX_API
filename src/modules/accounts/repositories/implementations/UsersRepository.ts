import { getRepository, Repository } from "typeorm";

import { ICreateUserTDO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    email,
    password,
    driver_licence,
  }: ICreateUserTDO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      driver_licence,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
