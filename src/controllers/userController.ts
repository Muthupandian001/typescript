import { BaseController } from "./baseController";
import userHelper from "../helpers/userHelper"
import { sequelize } from "../config/sequelize";
// import userInterface from "../interface/user"
class userController extends BaseController {

  /**
 * @description This is userController Api
 * @param req 
 * @param res 
 * @returns 
 */

  async addUser(req: any, res: any) {
    console.log("@addUserController @addUser api");
    try {
      // #swagger.tags = ["User"]
      // #swagger.description = 'Add User Data'
      let body = req.body;

      let checkUserExist = await userHelper.checkUserAlreadyExist(body.user_name);

      if (checkUserExist?.success) {
        return await this.success(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          {},
          checkUserExist.message
        );
      }

      let userData = await userHelper.addUser(body);

      if (userData.success) {
        return await this.success(
          req,
          res,
          this.status.HTTP_OK,
          userData.data,
          userData.message
        );

      }

    } catch (e) {

      return await this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }

  async get(req: any, res: any) {
    try {

      let userList = await userHelper.getUserList();

      if (userList.success) {
        return await this.success(
          req,
          res,
          this.status.HTTP_OK,
          userList.data,
          userList.message
        );

      }

    } catch (e) {
      return await this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }

  async update(req: any, res: any) {

    try {
      let data = req.body;
      let id = req.body.id
      
      let userData = await userHelper.updateUser(data, id);
      
      if (userData.success) {
        return await this.success(
          req,
          res,
          this.status.HTTP_OK,
          userData.data,
          userData.message
        );
      }
      else {
        return await this.success(
          req,
          res,
          this.status.HTTP_INTERNAL_SERVER_ERROR,
          userData.data,
          userData.message
        );
      }

    } catch (e) {
      return await this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
}

async delete(req: any, res: any) {

  try {
    console.log("req.param",req.params);
    
    let id = req.params.id
    
    let userData = await userHelper.deleteUser(id);
    
    if (userData.success) {
      return await this.success(
        req,
        res,
        this.status.HTTP_OK,
        userData.data,
        userData.message
      );
    }
    else {
      return await this.success(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        userData.data,
        userData.message
      );
    }

  } catch (e) {
    return await this.errors(
      req,
      res,
      this.status.HTTP_INTERNAL_SERVER_ERROR,
      this.exceptions.internalServerErr(req, e)
    );
  }
}


}
export default new userController();
