import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

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
    throw new AppError("token missing", 401);
  }

  // authHeader === bearer eyJhbG3iOiJIUzI1NiIsInR5cCI6IkpXVCd9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  // Logo a baixo vai separar pelo espaco e colocar em um Array, há parti de 0 nesse caso so será usado Array[1] o token em sí so.
  const [, token] = authHeader.split(" ");

  try {
    // Pegar parametro gerador md5 na pasta a baixo.
    // src/modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase.ts
    const { sub: user_id } = verify(
      token,
      auth.secret_token
    ) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
