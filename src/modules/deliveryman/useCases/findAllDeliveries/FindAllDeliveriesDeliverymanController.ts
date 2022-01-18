import { Request, Response } from 'express';
import { FindAllDeliveriesDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase';

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;

    const findAllDeliveriesDeliveryUseCase = new FindAllDeliveriesDeliverymanUseCase();
    const deliveries = await findAllDeliveriesDeliveryUseCase.execute(id_deliveryman);

    return response.json(deliveries);
  }
}