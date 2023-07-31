import express from 'express';
const healthRoutes = express.Router();

import HealthCheck from "../../controllers/healthCheck.controller";

healthRoutes.get('/healthCheck',HealthCheck.healthCheck);

export default healthRoutes;