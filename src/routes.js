import { Router } from 'express';
import devController from './app/controllers/DevController';
import testeController from './app/controllers/TestController';

const routes = new Router();

routes.get('/teste', testeController.teste)
routes.post('/devs', devController.teste)

export default routes;