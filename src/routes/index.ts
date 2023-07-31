import { Express } from "express";
import healthCheck from "./v1/healthCheck.route";
import userRoute from "./v1/userRoute"

const initializeRoutes = (app: Express) => {
  console.log("inside route");
  // Routes
  app.use("/v1", healthCheck);
  app.use("/v1/user", userRoute)
};

export default initializeRoutes;
