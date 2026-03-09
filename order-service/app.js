const { default: consola } = require("consola");
const express = require("express");
const promBundle = require("express-prom-bundle");
const app = express();
const port = 3003;

app.use(express.json());

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

app.use(metricsMiddleware);
const orders = [{ id: 1, userId: 1, productIds: [1, 2], total: 1500 }];

app.post("/orders", (req, res) => {
  const { userId, productIds, total } = req.body;
  const newOrder = {
    id: orders.length + 1,
    userId,
    productIds,
    total,
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get("/orders", async (req, res) => {
  const userId = req.query.userId ? parseInt(req.query.userId) : null;
  let filteredOrders = userId
    ? orders.filter((o) => o.userId === userId)
    : orders;

  // Enrich orders with product details from Product Service
  const enrichedOrders = await Promise.all(
    filteredOrders.map(async (order) => {
      consola.info("Filtered orders", order);
      try {
        const PRODUCT_SERVICE_URL =
          process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";
        const enrichedProducts = await Promise.all(
          order.productIds.map(async (id) => {
            const response = await fetch(
              `${PRODUCT_SERVICE_URL}/products/${id}`,
            );
            if (response.ok) return await response.json();
          }),
        );
        return { ...order, products: enrichedProducts };
      } catch (err) {
        consola.error("Error fetching product service", err);
        return order;
      }
    }),
  );

  res.json(enrichedOrders);
});

app.listen(port, () => {
  console.log(`Order Service listening at http://localhost:${port}`);
});
