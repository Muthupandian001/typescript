//Env
import { join } from "path";

import dotenv from "dotenv";
import { argv } from 'process';
dotenv.config({ path: join(__dirname, '..', `${argv[3]}`) })


//Middleware npm
import express from "express";
import helmet from "helmet";
import cors from "cors";

//Middlewares
import Router from "./routes";

//AWS logger
// import appLogger from "./utils/logger";


//Database connection
import { verifyDBConnection } from "./config/sequelize";
import Encryption from "./encryption/encrypt";

//PORT
const PORT = process.env.PORT;

const app = express();

//Express usage
app.use(express.json());
app.use(express.static("public"));
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(helmet());
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


//Database connection Established
// try {
//   verifyDBConnection();
//   console.log("Database connected successfully");
// } catch (e) {
//   console.log("Database connection failed", e);
// }


//Encryption Method
app.use(async (req: any, res: any, next) => {
  try {
    if(process.env.REQ_DECRYPTION == "true"){
      console.log("REQ_DECRYPTION");
      await Encryption.decryptReq(req,res);
    }
    if(process.env.RES_ENCRYPTION == "true"){
      console.log("RES_ENCRYPTION");
      await Encryption.encryptRes(req,res)
    }
    next();
  } catch (e) {
    console.log("Error in requestDecryption",e);
  }
});


//Router path
Router(app);


app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});