import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../in-memory/UsersRepositoryInMemory";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123456",
      name: "User Test",
      email: "test@email.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "999",
      name: "User Test Error",
      email: "test@email.com",
      password: "123456",
    };
    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "1234",
      })
      ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });

  it("should not be able to authenticate with incorrect email", async () => {
    const user: ICreateUserDTO = {
      driver_license: "999",
      name: "User Test Error",
      email: "test@email.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "error@email.com",
        password: user.password,
      })
      ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });
});
