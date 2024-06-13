import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swaggerConfig";
import routes from "./routes";
import example from "./routes/api/v1/exampleRoute";
import dotenv from "dotenv";

dotenv.config();

const runtime_args = require("minimist")(process.argv.slice(2));

const PORT = runtime_args["port"] || process.env.APP_PORT || 8000;

const app: Application = express();

app.use(express.json());

app.use(routes);

// app.use("/api/v1/exampleRoute", example);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
