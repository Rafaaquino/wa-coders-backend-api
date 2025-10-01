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
app.use(
  cors({ credentials: true, origin: [config.HOST_FRONT, config.HOST_DEV, "https://wacoders.com"] })
);

//routes
app.use(`${config.API}/emails`, EmailsRouter);
app.use(`${config.API}/users`, UserRoutes);
app.use(`${config.API}/tickets`, Ticket);
app.use(`${config.API}/commons`, Commons);

app.listen(PORT, () => {
  console.log(`servidor ON em  http://localhost:${PORT}`);
});
