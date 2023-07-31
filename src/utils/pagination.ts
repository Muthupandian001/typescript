import { BaseController } from "../controllers/baseController"

class Pagination extends BaseController {

//module.exports = {
    paginationData(limit: any, page: any, data: any) {
      try {
        return {
          results: data.rows,
          total: data.count,
          pageMeta: {
            page: page,
            pageCount: Math.ceil(data.count / limit),
            nextPage: page >= Math.ceil(data.count / limit) ? null : page + 1,
            pageSize: limit,
            total: data.count,
          },
        };
      } catch (e) {
        console.log(e);
      }
    }
  };
  
export default new Pagination();
