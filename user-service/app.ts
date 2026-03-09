import express, { type Request, type Response } from "express";
import promBundle from "express-prom-bundle";

interface User {
  id: number;
  name: string;
}

interface UserWithOrders extends User {
  orders: unknown[];
  message?: string;
}

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

const users: User[] = [
  { id: 1, name: "Vicky" },
  { id: 2, name: "Adi" },
];

app.get("/users", (_req: Request, res: Response) => {
  res.json(users);
});

app.get("/users/:id", async (req: Request<{ id: string }>, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) return res.status(404).send("User not found");

  try {
    const ORDER_SERVICE_URL =
      process.env.ORDER_SERVICE_URL || "http://localhost:3003";
    const response = await fetch(
      `${ORDER_SERVICE_URL}/orders?userId=${userId}`,
    );
    const orders: unknown[] = response.ok ? await response.json() : [];

    const userWithOrders: UserWithOrders = {
      ...user,
      orders,
    };

    res.json(userWithOrders);
  } catch (_err) {
    const userWithOrders: UserWithOrders = {
      ...user,
      orders: [],
      message: "Order Service unavailable",
    };

    res.json(userWithOrders);
  }
});

app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});
