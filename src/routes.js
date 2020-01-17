import { Router } from 'express';
import devController from './app/controllers/DevController';

const routes = new Router();

routes.post('/devs', devController.store)
routes.get('/devs', devController.index)

export default routes;