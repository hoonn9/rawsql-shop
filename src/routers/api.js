const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/products", (req, res, next) => {
  db.getConnection((err, conn) => {
    if (err) return res.status(403);
    conn.query(
      `
        SELECT 
        product.product_id, 
        product.product_brand,
        product.product_color,
        product.rent_price,
        info.info_id,
        info.info_gender,
        info.info_material
        FROM TB_Products AS product
        LEFT JOIN TB_Info AS info ON info.info_id = product.info_id
      `,
      (err, results) => {
        console.log(err);
        if (err) return res.status(403);
        console.log(results);
      }
    );
  });
  res.status(200).send("hi");
});

router.post("/products", (req, res, next) => {
  db.getConnection((err, conn) => {
    if (err) return res.status(403);

    conn.query(
      `
        INSERT INTO TB_Info(info_gender, info_material) VALUES('male', 'any')
        `,
      (err, results) => {
        if (err) return res.status(400);
        conn.query(
          `
              INSERT INTO TB_Products(product_brand, product_color, rent_price, info_id) VALUES(?, ?, ?, ?)
            `,
          [req.body.brand, req.body.color, req.body.price, results.insertId],
          (err, results) => {
            if (err) return res.status(400);
            console.log(results);
          }
        );
      }
    );
  });
  res.status(200).send("hi");
});

module.exports = router;
