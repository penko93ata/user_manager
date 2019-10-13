const Hapi = require('@hapi/hapi');
const connectDB = require('./config/db');

connectDB();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: 'localhost'
  });

  server.route(require('./routes/home'));
  server.route(require('./routes/about'));
  server.route(require('./routes/users'));
  server.route(require('./routes/auth'));
  server.route(require('./routes/profiles'));

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
