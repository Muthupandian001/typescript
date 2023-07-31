import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import userService from "../helpers/userService";
import { LoginType } from "../constants/statuses&Types";

export class Authenticate {
  static generateToken = (data: any) => {
    return jwt.sign(
      {
        time: Date(),
        ...data,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
  };

  static tokenVerification = (token: any) => {
    try {
      let verifiedData = jwt.verify(token, process.env.JWT_SECRET);
      return verifiedData ? verifiedData : false;
    } catch (error) {
      return false;
    }
  };

  static webLoginAccess = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
          data: [],
        });
      }
      token = token.split(" ")[1];
      let data: any = Authenticate.tokenVerification(token), user;

      if (data) user = await userService.getUserService({ id: data.id, user_name: data.user_name });

      if (!data.id || !user.status || !data.login_type || data.login_type !== LoginType.WEB) {
        return res.status(401).json({
          status: 401,
          message: "Token invalid! Access denied",
          data: [],
        });
      }

      req.user = data;
      return next();
    } catch (e) {
      // return Response.errors(req, res, StatusCodes.HTTP_UNAUTHORIZED, MessageTypes.unAuthorizedAccess())
    }
  };

  static appLoginAccess = async (req: any, res: Response, next: NextFunction) => {
    try {
      let token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({ status: 401, message: "Unauthorized", data: [] });
      }
      token = token.split(" ")[1];
      let data: any = Authenticate.tokenVerification(token), user;

      if (data) user = await userService.getUserService({ id: data.id, user_name: data.user_name });

      if (!data.id || !user.status || !data.login_type || data.login_type !== LoginType.APP) {
        return res.status(401).json({ status: 401, message: "Token invalid! Access denied", data: [] });
      }

      req.user = data;
      return next();
    } catch (e) {
      // return Response.errors(req, res, StatusCodes.HTTP_UNAUTHORIZED, MessageTypes.unAuthorizedAccess())
    }
  };
}
