import { Router } from 'express';
import cors from 'cors';

import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use(cors());
routes.use('/transactions', transactionsRouter);

export default routes;
