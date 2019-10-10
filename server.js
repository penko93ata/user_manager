const Hapi = require('@hapi/hapi');
const connectDB = require('./config/db');
const Joi = require('@hapi/joi');

connectDB();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3100,
    host: 'localhost'
  });

  server.route(require('./routes/home'));
  server.route(require('./routes/about'));
  server.route(require('./routes/users'));
  server.route(require('./routes/auth'));

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
