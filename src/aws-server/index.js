const sls = require('serverless-http');
const app = require('../app');
//import { app } from '../app';

module.exports.handler = sls(app);