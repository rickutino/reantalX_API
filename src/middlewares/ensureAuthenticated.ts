import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("token missing");
  }

  // authHeader === bearer eyJhbG3iOiJIUzI1NiIsInR5cCI6IkpXVCd9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  // Logo a baixo vai separar pelo espaco e colocar em um Array, há parti de 0 nesse caso so será usado Array[1] o token em sí so.
  const [, token] = authHeader.split(" ");

  try {
    // Pegar parametro gerador md5 na pasta a baixo.
    // src/modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase.ts
    const { sub: user_id } = verify(
      token,
      "518eefa1df679e103bc4ac57a12df2c1"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exist!");
    }

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
