import { ICreateUserTDO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create(data: ICreateUserTDO): Promise<void>;
}

export { IUsersRepository };
