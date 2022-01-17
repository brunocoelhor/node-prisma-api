import { Router } from 'express';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/CreateDeliveryController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/CreateDeliverymanController';

const routes = Router();

const authenticateClienteController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();

routes.post('/client/authenticate', authenticateClienteController.handle);
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle);

routes.post('/client', createClientController.handle);
routes.post('/deliveryman', createDeliverymanController.handle);
routes.post('/delivery', ensureAuthenticateClient, createDeliveryController.handle);

export { routes };