const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const pdata = path.join(__dirname, "../views/products/products.json");

let products = [
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
  const products = read();
  res.render("manage.ejs", {
    products: products,
  });
});

//TODO : GET to file json
router.get("/insert", (req, res) => {
  // const items = read();
  // res.json(items);

  res.render("index.ejs", {
    products: products,
  });
  //
});

//TODO: POST to use json
router.post("/insert", (req, res) => {
  // let products = read();
  const productId =
    products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const newItem = {
    // id: productId,
    name: req.body.name,
    price: Number(req.body.price),
    image: req.body.image,
    description: req.body.description,
  };

  // const nextId = items.length > 0 ? items[items.length - 1].id + 1 : 1;

  // newItem.id = nextId;

  // items.push(newItem);
  products.push(newItem);

  write(products);

  // let allProducts = read();
  // allProducts = allProducts.map((item, index) => {
  //   return {
  //     id: index + 1,
  //     name: item.name,
  //     price: item.price,
  //     image: item.image,
  //     description: item.description,
  //   };
  // });
  // write(allProducts);
  res.redirect("/");
  // res.render("index.ejs", {
  //   products: products,
  // });
});

module.exports = router;
