const express = require("express");
const cors = require("cors");
const config = require("./src/app/config/config");
const UserRoutes = require("./src/app/routes/UserRoutes");
const EmailsRouter = require("./src/app/routes/EmailsRoutes");
const Ticket = require("./src/app/routes/TicketRoutes");
const Commons = require("./src/commons/routes/api-commons");
const app = express();
const PORT = process.env.PORT || 3000;

// config json response
app.use(express.json());

//resolve cors
const allowedOrigins = [
  config.HOST_FRONT, // https://www.wacoders.com
  config.HOST_PROD, // https://wacoders.com
  config.HOST_DEV, // http://localhost:4200
  "https://wa-coders-backend-api.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // permite requisições sem origin (ex.: curl, Postman, Vercel serverless)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS policy does not allow access from this origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

//routes
app.use(`${config.API}/emails`, EmailsRouter);
app.use(`${config.API}/users`, UserRoutes);
app.use(`${config.API}/tickets`, Ticket);
app.use(`${config.API}/commons`, Commons);

// Exporta para a Vercel (não usar app.listen)
module.exports = app;
