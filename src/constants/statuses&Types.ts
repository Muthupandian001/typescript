import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), `${process.argv[2] || ".env"}`) });

const Path = {
  csvFilesPath: path.join(process.cwd() + "/csvFiles", "business_data.csv"),
};

const SessionStatus = {
  ACTIVE:   1,
  INACTIVE: 2,
};

const Status = {
  ACTIVE:   1,
  INACTIVE: 2,
};

const LoginType = {
  WEB: 1,
  APP: 2,
};

export { SessionStatus, Status, Path, LoginType };
