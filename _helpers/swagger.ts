import express from 'express';
const router = express.Router();
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const CSS_URL = "https://unpkg.com/swagger-ui-dist@5.32.4/swagger-ui.css";
const JS_URLS = [
    "https://unpkg.com/swagger-ui-dist@5.32.4/swagger-ui-bundle.js",
    "https://unpkg.com/swagger-ui-dist@5.32.4/swagger-ui-standalone-preset.js"
];

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCssUrl: CSS_URL,
    customJs: JS_URLS
}));

export default router;
