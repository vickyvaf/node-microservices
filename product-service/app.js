const express = require("express");
const promBundle = require("express-prom-bundle");
const app = express();
const port = 3002;

app.use(express.json());

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

app.use(metricsMiddleware);
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`);
});
