# Product Requirements Document (PRD) - Bun Express Microservices

## 1. Project Overview
Implementation of a **Bun + Express Microservices** architecture with a clear separation of concerns for each independent service. The primary focus of development is to ensure high scalability, operational independence, and efficient inter-service communication within the high-performance Bun runtime ecosystem.

### Key Objectives:
- **Decoupled Architecture**: Implementing a modular system to support horizontal scalability and independent deployment cycles.
- **Service Isolation**: Ensuring strict isolation of business logic and data persistence at the service level.
- **Inter-service Resonance**: Building a solid foundation for inter-service communication to orchestrate complex business processes.
- **High-Performance Runtime**: Optimizing Bun's capabilities to enhance execution speed and resource efficiency.

---

## 2. Core Services

### 1. User Service
Manages user data and profiles.
- **Port:** `3001`
- **Responsibilities:**
  - Store and manage user data.
  - Provide supporting APIs for user identity.

**Endpoints:**
| Method | Endpoint     | Description                  |
|:-------|:-------------|:-----------------------------|
| `GET`  | `/users`     | Retrieve a list of all users |
| `GET`  | `/users/:id` | Retrieve user details by ID  |

**Data Example:**
```json
[
  { "id": 1, "name": "Vicky" },
  { "id": 2, "name": "Adi" }
]
```

---

### 2. Product Service
Manages the product catalog and inventory.
- **Port:** `3002`
- **Responsibilities:**
  - Store and manage product data.
  - Provide APIs for product information.

**Endpoints:**
| Method | Endpoint        | Description                     |
|:-------|:----------------|:--------------------------------|
| `GET`  | `/products`     | Retrieve a list of all products |
| `GET`  | `/products/:id` | Retrieve product details by ID  |

**Data Example:**
```json
[
  { "id": 1, "name": "Laptop" },
  { "id": 2, "name": "Mouse" }
]
```

---

### 3. Order Service
Manages transactions and orders placed by users.
- **Port:** `3003`
- **Responsibilities:**
  - Manage the order lifecycle.
  - Connect actors (User) with items (Product).

**Endpoints:**
| Method | Endpoint  | Description                          |
|:-------|:----------|:-------------------------------------|
| `POST` | `/orders` | Create a new order                   |
| `GET`  | `/orders` | Retrieve a list of all order history |

**Data Example:**
```json
[
  { "id": 1, "userId": 1, "productIds": [1, 2], "total": 1500 }
]
```

---

## 3. Technology Stack & Architecture Notes

- **Runtime:** Bun
- **Framework:** Express.js
- **Package Manager:** Bun
- **Data Persistence:** Uses in-memory or dummy data for demonstration purposes. 
  > **Note:** In a production environment, each service must have its own database (Local DB per service).
- **Communication:** Currently independent; inter-service communication can be enhanced using HTTP REST or Message Queues (such as RabbitMQ/Kafka) for scalability.

---

## 4. Setup & Running Instructions

### Installation Steps
1. Clone the repository to your local machine.
2. Install dependencies for the entire project:
   ```bash
   bun install
   ```

### Running the Services
Open a separate terminal for each service or run them in the background:
```bash
# Terminal 1
bun user-service/app.js

# Terminal 2
bun product-service/app.js

# Terminal 3
bun order-service/app.js
```

### Verification
Use Postman, Insomnia, or `curl` to test the endpoints available on each port (`3001`, `3002`, `3003`).
