import { Router } from 'express';
import devController from './app/controllers/DevController';
import searchController from './app/controllers/SearchController'

const routes = new Router();

routes.post('/devs', devController.store)
routes.get('/devs', devController.index)
routes.post('/search', searchController.index)

export default routes;