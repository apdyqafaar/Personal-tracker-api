import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(process.env.NODE_ENV =='development'?import.meta.url :'https://personal-tracker-api-z0z2.onrender.com');
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
