import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
class UploadUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist!", 401);
    }

    await deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

export { UploadUserAvatarUseCase };
