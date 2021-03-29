// Constants
const PORT = process.env.PORT || 5000;


const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const ip = require('ip');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const connectDB = require('./src/database/db-config');
require('dotenv').config();
require('colors');

const {
  responseMiddleware,
  unauthorizedMiddleware,
  securityMiddleware,
} = require('./src/middlewares');

const StreetMap = require('./src/routes/StreetMap-routes');
const SwaggerRoutes = require('./src/doc/swagger-config');

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(responseMiddleware);
app.use(unauthorizedMiddleware);
securityMiddleware(app);

// Routes
app.use('/api', [StreetMap, SwaggerRoutes]);

// catch 404
app.use((req, res) =>
  res.parseReturn({
    status: 404,
    errors: [
      {
        message: `Invalid Route, Access http://${ip.address()}:${PORT}/api/docs`,
      },
    ],
  })
);

app.use((err, req, res) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  return res.status(status).json(error);
});

const startServer = async () => {
  server.listen(PORT, () => {
    console.log(
      `Server is running at port ${PORT}, see more about the application on: http://${ip.address()}:${PORT}/api/docs`
        .bgMagenta
    );
  });
};

(async () => {
  await connectDB();
  await startServer();
})();

module.exports = app;
