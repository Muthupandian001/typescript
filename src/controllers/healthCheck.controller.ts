import { Request, Response } from "express";

import { BaseController } from "./baseController"

interface PingResponse {
  message: string;
}
 
class HealthCheck extends BaseController {

  /**
   * @description This is healthcheck Api
   * @param req 
   * @param res 
   * @returns 
   */
  async healthCheck(req: Request, res: Response) {
    try {
      return res.send({ "message":"Health check working" })
    } catch (e) {
      console.log("healthCheck",e);
      return res.send({ "message":"Health check failed" })
    }
  }
}

export default new HealthCheck();
