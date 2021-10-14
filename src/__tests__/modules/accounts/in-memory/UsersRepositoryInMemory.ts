import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const userEmail = this.users.find((user) => user.email === email);

    return userEmail;
  }

  async findById(id: string): Promise<User> {
    const userId = this.users.find((user) => user.id === id);

    return userId;
  }
}

export { UsersRepositoryInMemory };
