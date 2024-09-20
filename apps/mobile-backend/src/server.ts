import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swaggerConfig';
import cors from 'cors';
import routes from './routes';
import { HOST, PORT } from './init';

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(routes);

// app.use("/api/v1/exampleRoute", example);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`for api docs use ${HOST}:${PORT}/api-docs`);
});

export { app };
