const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pdata = path.join(__dirname, "../views/products/products.json");
const prouter = path.join(__dirname, "./myrouter.js");

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

function read() {
  try {
    const rawData = fs.readFileSync(pdata, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    return [];
  }
}
function readroute() {
  let data = fs.readFileSync(pdata, "utf8");
  let dataArray = JSON.parse(data);

  dataArray.push(products);

  const updatedJson = JSON.stringify(dataArray, null, 2);
  fs.writeFileSync(pdata, updatedJson, "utf8");
}

function write(data) {
  fs.writeFileSync(pdata, JSON.stringify(data, null, 2), "utf8");
}

// function writeproduct(data) {
//   fs.writeFile(prouter, JSON.stringify(data, null, 4), "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
// }

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
router.get("/insert", (req, res) => {
  const items = read();
  res.json(items);

  res.render("index.ejs");
  //
});

//TODO: POST to use json
router.post("/insert", (req, res) => {
  const items = read();

  const newItem = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
  };

  const nextId = items.length > 0 ? items[items.length - 1].id + 1 : 1;

  newItem.id = nextId;

  items.push(newItem);
  items.push(products);
  write(items);
  readroute();

  res.render("index.ejs", {
    products: products,
  });
});

module.exports = router;
