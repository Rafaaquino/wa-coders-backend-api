const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const UserRoutes = require("./src/routes/UserRoutes");
const EmailsRouter = require("./src/routes/EmailsRoutes");
const app = express();
const PORT = 3000;

// config json response
app.use(express.json());

//resolve cors
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));

//routes
app.use(`${config.API}/emails`, EmailsRouter);
app.use(`${config.API}/users`, UserRoutes);

app.listen(PORT, () => {
  console.log(`servidor ON em  http://localhost:${PORT}`);
});
