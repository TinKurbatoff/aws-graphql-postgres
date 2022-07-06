// import errorHandler from 'errorhandler';
// import { Serverless } from 'serverless/aws';
import { app } from './app';


/**
 * Error Handler.
 */
// app.use(errorHandler());
const port = app.get('port');
const env = app.get('env');

/**
 * Start Express server.
 */
const server = app.listen(port, () => {
  console.log('  App is running at http://localhost:%d in %s mode', port, env);

  if (env === 'development') {
    console.log('  Playground is running at http://localhost:%d/graphql', port);
  }
  console.log('  Press CTRL-C to stop\n');
});


export { server };
