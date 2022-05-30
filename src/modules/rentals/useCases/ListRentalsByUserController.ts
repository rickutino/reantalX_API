import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
  async handle(request: Request, reponse: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentals = await listRentalsByUserUseCase.execute(id);

    return response.json(rentals);
  }
}

export { ListRentalsByUserController }
