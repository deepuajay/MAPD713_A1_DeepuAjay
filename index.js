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

app.post(`${postEndpoint}`, (req, res) => {
  const product = req.body;
  if (
    !product ||
    !product.productId ||
    !product.name ||
    product.price ||
    !product.price ||
    !product.quantity
  )
    res.status(400).json({ error: "Invalid data" });
  datastore.products.push(product);
  res.status(201).json(product);
});

app.listen(port, () => {
  console.log(
    `\nServer is listening at http://localhost:${port} \n\nMethod:Post\nEndpoint: http://localhost:${port}/${postEndpoint}
    \n\n example product object : {"productId": 123, "name":"Candle", "price":12.99, "quantity": 12}
  \n\nMethod:Get\nEndpoint: http://localhost:${port}/${getEndpoint}`
  );
});
