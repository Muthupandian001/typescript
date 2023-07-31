import { Parser } from "json2csv";
import fs from "fs";

const downloadCSVFile = async (path: any, list: any, fields: any) => {
  const json2csv = new Parser({ fields });
  let csv = json2csv.parse(list);
  await new Promise((resolve: any, reject) => {
    fs.writeFile(path, csv, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
  return {};
};

export { downloadCSVFile };
