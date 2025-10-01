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
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      console.log("CORS origin:", origin); // Para debug

      if (!origin) return callback(null, true); // Postman, curl, etc

      // aceitar domínios fixos
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // aceitar subdomínios do vercel
      if (/\.vercel\.app$/.test(origin)) return callback(null, true);

      return callback(
        new Error("CORS policy does not allow access from this origin."),
        false
      );
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
module.exports = require("@vercel/node")(app);
