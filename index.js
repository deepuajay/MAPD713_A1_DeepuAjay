import express from "express";
const app = express();

app.use(express.json()); //interceptor for post requests

const port = 3000;
const postEndpoint = "product";
const getEndpoint = "products";

let datastore = {
  products: [],
};

app.get(`/${getEndpoint}`, (req, res) => {
  res.json(datastore.products);
});

app.post(`/${postEndpoint}`, (req, res) => {
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
});

app.delete(`/${getEndpoint}`, (req, res) => {
  datastore.products = [];
  res.status(200).json({ message: "All products deleted" });
});

app.listen(port, () => {
  console.log(
    `\nServer is listening at http://localhost:${port} \n\nMethod:Post\nEndpoint: http://localhost:${port}/${postEndpoint}
    \n\nexample product object : {"productId": 123, "name":"Candle", "price":12.99, "quantity": 12}
  \n\nMethod:Get\nEndpoint: http://localhost:${port}/${getEndpoint}\n\nMethod:Delete\nEndpoint: http://localhost:${port}/${getEndpoint}`
  );
});
