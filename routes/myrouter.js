const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const path_product = path.join(__dirname, "../views/products/products.json");
const products = [
  {
    name: "โน๊ตบุ๊ค",
    price: 25500,
    image: "images/products/product1.png",
    description: "Notebook",
  },
  {
    name: "เสื้อผ้า",
    price: 2000,
    image: "images/products/product2.png",
    description: "Clothes",
  },
  {
    name: "หูฟัง",
    price: 1500,
    image: "images/products/product3.png",
    description: "Earphones",
  },
];
router.get("/", (req, res) => {
  res.render("index.ejs", {
    products: products,
  });
});

router.get("/addForm", (req, res) => {
  res.render("form");
});

router.get("/manage", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../views/products/products.json"),
    "utf-8",
    (err, data) => {
      if (err) throw err;
      const products = JSON.parse(data);

      res.render("manage.ejs", {
        products: products,
      });
    }
  );
});
//TODO : GET to file json
// router.get("/insert", (req, res) => {
//   // fs.readFile(
//   //   path.join(__dirname, "../views/products/products.json"),
//   //   "utf-8",
//   //   (err, data) => {
//   //     if (err) {
//   //       console.error(err);
//   //       return res.status(500).json({ error: "Failed to read data file" });
//   //     }
//   //     res.status(200).json(JSON.parse(data));
//   //   }
//   // );
// });
//TODO: POST to use json
router.post("/insert", (req, res) => {
  const newItem = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
  };

  if (!newItem) {
    return res.status(400).json({ error: "Request body cannot be empty" });
  }
  fs.readFile(path_product, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading data file" });
    }
    let items = [];
    if (data) {
      try {
        items = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return res.status(500).json({ error: "Error parsing JSON data" });
      }
    }
    items.push(newItem);
    fs.writeFile(path_product, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error writing data to file" });
      }
      console.log("New item added and saved to file.");
      res
        .status(201)
        .json({ message: "Item added successfully", item: newItem });
    });
    file = "../routes/myrouter.js";
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      try {
        const jsonObject = JSON.parse(data);
        jsonObject.push(products);
        fs.writeFile(
          file,
          JSON.stringify(jsonObject, null, 2),
          "utf8",
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Data successfully added to file.");
            }
          }
        );
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    });
  });
  res.render("index.ejs", {
    products: products,
  });
});

module.exports = router;
