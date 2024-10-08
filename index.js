import express from "express";
const app = express();

app.use(express.json());

const port = 3000;
const postEndpoint = "product";
const getEndpoint = "products";

let getRequestCount = 0;
let postRequestCount = 0;
let deleteRequestCount = 0;

const printRequestCount = function () {
  console.log(
    `Processed Request Count--> Get: ${getRequestCount}, Post: ${postRequestCount}, Delete: ${deleteRequestCount}`
  );
};

let datastore = {
  products: [],
};

app.get(`/${getEndpoint}`, (req, res) => {
  getRequestCount++;
  res.json(datastore.products);
  printRequestCount();
});

app.post(`/${postEndpoint}`, (req, res) => {
  postRequestCount++;
  const product = req.body;
  if (
    !product ||
    !product.productId ||
    !product.name ||
    !product.price ||
    !product.quantity
  ) {
    return res.status(400).json({ error: "Invalid data" });
  }
  datastore.products.push(product);
  res.status(201).json(product);
  printRequestCount();
});

app.delete(`/${getEndpoint}`, (req, res) => {
  deleteRequestCount++;
  datastore.products = [];
  res.status(200).json({ message: "All products deleted" });
  printRequestCount();
});

app.listen(port, () => {
  console.log(
    `\nServer is listening at http://localhost:${port} \n\nMethod:Post\nEndpoint: http://localhost:${port}/${postEndpoint}
    \n\nexample product object : {"productId": 123, "name":"Candle", "price":12.99, "quantity": 12}
  \n\nMethod:Get\nEndpoint: http://localhost:${port}/${getEndpoint}\n\nMethod:Delete\nEndpoint: http://localhost:${port}/${getEndpoint}`
  );
});
