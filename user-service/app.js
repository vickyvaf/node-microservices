const express = require("express");
const promBundle = require("express-prom-bundle");
const app = express();
const port = 3001;

app.use(express.json());

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

app.use(metricsMiddleware);
const users = [
  { id: 1, name: "Vicky" },
  { id: 2, name: "Adi" },
];

app.get("/users", (_, res) => {
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) return res.status(404).send("User not found");

  // Fetch orders for this user from Order Service
  try {
    const ORDER_SERVICE_URL =
      process.env.ORDER_SERVICE_URL || "http://localhost:3003";
    const response = await fetch(
      `${ORDER_SERVICE_URL}/orders?userId=${userId}`,
    );
    const orders = response.ok ? await response.json() : [];

    res.json({
      ...user,
      orders: orders,
    });
  } catch (err) {
    res.json({
      ...user,
      orders: [],
      message: "Order Service unavailable",
    });
  }
});

app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});
