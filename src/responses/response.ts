import { ResponseStatus } from "../responses/code";

class Response {
  async success(
    req: any,
    res: any,
    status: any,
    data: any,
    message = "success"
  ) {
    try {
      console.log("************************** Response");

      if (data == null) {
        data._id = "";
      }

      return res.status(status).json({
        status,
        message,
        data,
      });
    } catch (error) {
      console.log("************************** Response success", error);
      return res.status(status).json({
        status,
        message,
      });
    }
  }

  async errors(req: any, res: any, status: any, message: any) {
    try {
      return res.status(status).json({
        status,
        message,
      });
    } catch (error) {
      console.log("************************** errors", error);
      return res.status(status).json({
        status,
        message,
      });
    }
  }

  joierrors(req: any, res: any, err: any) {
    let error = err.details.reduce((prev: any, curr: any) => {
      prev[curr.path[0]] = curr.message.replace(/"/g, "");
      return prev;
    }, {});
    let message = "Bad Request";
    let status = ResponseStatus.HTTP_BAD_REQUEST;

    return res.status(status).json({
      status,
      message,
      error,
    });
  }
}

export default new Response();
