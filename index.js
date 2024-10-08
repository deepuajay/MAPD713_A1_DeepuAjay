import express from "express";
const app = express();

app.use(express.json()); //interceptor for post requests

const port = 3000;
const endpoint = "products";

app.get(`/${endpoint}`, (req, res) => {
  res.json({ productId: 123, name: "Candle", price: 12.99, quantity: 12 });
});

app.listen(port, () => {
  console.log(
    `Server is listening at http://localhost:${port} \nEndpoints: http://localhost:${port}/${endpoint}`
  );
});
