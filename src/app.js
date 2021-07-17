const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

require("./seeder");

const app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use("/static", express.static(__dirname + "/uploads"));

let sql = require("./sql.js");

fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});

const apiRouter = require("./routers/api");
app.use("/api", apiRouter);

// const sys = {
//   async db(alias, param = [], where = "") {
//     return new Promise((resolve, reject) =>
//       dbPool.query(sql[alias].query + where, param, (error, rows) => {
//         if (error) {
//           if (error.code != "ER_DUP_ENTRY") console.log(error);
//           resolve({
//             error,
//           });
//         } else resolve(rows);
//       })
//     );
//   },
// };

app.listen(3000, () => {
  var dir = __dirname + "/uploads";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  console.log("Server stared. port 3000.");
});
