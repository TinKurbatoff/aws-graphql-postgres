const sls = require('serverless-http');
import { app } from '../app';

export const handler = sls(app);
