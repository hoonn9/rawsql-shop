const db = require("./db");

db.query("SELECT 1 + 1 AS solution", (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});
