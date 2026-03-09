# Node Microservices with Grafana Monitoring

This project demonstrates a simple microservices architecture using Node.js, Express, and Bun, fully instrumented with a Grafana monitoring stack (Prometheus, Promtail, and Loki).

## Prerequisites
- [Bun](https://bun.sh/) installed locally
- [Docker](https://www.docker.com/) & Docker Compose installed

## Setup

First, install the dependencies required for the project:

```bash
bun install
# or
npm install
```

---

## 🚀 Running Locally (Without Docker)

You can run the microservices directly on your host machine using Bun. Note that this requires you to have the monitoring stack running separately if you wish to visualize metrics, though the endpoints will still function.

**Run a specific service:**
```bash
bun run start:user     # Starts User Service on port 3001
bun run start:product  # Starts Product Service on port 3002
bun run start:order    # Starts Order Service on port 3003
```

**Run all services at once (using concurrently):**
```bash
bun run start:all
```

---

## 🐳 Running with Docker Compose (Recommended)

To run the entire ecosystem including all microservices and the monitoring stack, use the provided Docker Compose scripts.

### Build and Start All Services + Monitoring
This will build the Docker images and start everything in detached mode within a shared `microservice-network` network.

```bash
bun run docker:all
```

### Stop All Services + Monitoring
To tear down the containers and the network:

```bash
bun run docker:down:all
```

### Running Individual Components
If you only want to spin up specific parts of the architecture:

```bash
bun run docker:user        # Start User Service in Docker
bun run docker:product     # Start Product Service in Docker
bun run docker:order       # Start Order Service in Docker
bun run docker:monitoring  # Start Grafana, Prometheus, Promtail, Loki in Docker
```
*(Each has a corresponding `bun run docker:down:<name>` command as well).*

---

## 📊 Accessing Grafana & Monitoring

Once the services are running via Docker Compose (`bun run docker:all`), you can access the monitoring dashboard and endpoints:

### Grafana Dashboard
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Login Credentials**:
  - Username: `admin`
  - Password: `admin`
- **Data Sources**: Prometheus and Loki are pre-provisioned. You can immediately go to the **Explore** tab to query metrics or logs.

### Prometheus UI
- **URL**: [http://localhost:9090](http://localhost:9090)
- To verify that microservices are being correctly scraped, navigate to **Status > Targets** in the Prometheus UI.

### Service Metrics Endpoints
Each service automatically exposes a `/metrics` endpoint that Prometheus scrapes. You can view the raw metric data here:
- User Service: [http://localhost:3001/metrics](http://localhost:3001/metrics)
- Product Service: [http://localhost:3002/metrics](http://localhost:3002/metrics)
- Order Service: [http://localhost:3003/metrics](http://localhost:3003/metrics)

---

## 📝 Viewing Logs in Grafana (Loki)

Promtail is configured to automatically capture `stdout` and `stderr` from all containers running on the Docker host.

1. Open Grafana ([http://localhost:3000](http://localhost:3000)).
2. Navigate to **Explore** (compass icon on the left sidebar).
3. Select **Loki** from the data source dropdown at the top.
4. Run a LogQL query to view logs for a specific service. For example:
   ```logql
   {container="user-service-user-service-1"}
   ```
   *(Adjust the container name according to your Docker Compose setup, or use labels).*
