FROM oven/bun:latest

WORKDIR /app

# Copy package files from root
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy service source code
COPY order-service/ ./order-service/

# Expose port
EXPOSE 3003

CMD ["bun", "order-service/app.ts"]
