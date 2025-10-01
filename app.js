const express = require("express");
const cors = require("cors");
const config = require("./src/app/config/config");
const UserRoutes = require("./src/app/routes/UserRoutes");
const EmailsRouter = require("./src/app/routes/EmailsRoutes");
const Ticket = require("./src/app/routes/TicketRoutes");
const Commons = require("./src/commons/routes/api-commons");

const app = express();
const PORT = process.env.PORT || 3000;

// Config JSON response
app.use(express.json());

// Resolve CORS
const allowedOrigins = [config.HOST_FRONT, config.HOST_PROD, config.HOST_DEV];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      console.log("CORS origin:", origin);

      if (!origin) return callback(null, true); // Postman, curl, etc

      if (allowedOrigins.includes(origin)) return callback(null, true);

      if (/\.vercel\.app$/.test(origin)) return callback(null, true);

      return callback(
        new Error("CORS policy does not allow access from this origin."),
        false
      );
    },
  })
);

// Routes
app.use(`${config.API}/emails`, EmailsRouter);
app.use(`${config.API}/users`, UserRoutes);
app.use(`${config.API}/tickets`, Ticket);
app.use(`${config.API}/commons`, Commons);

// Exporta apenas para Vercel
module.exports = require("@vercel/node")(app);
