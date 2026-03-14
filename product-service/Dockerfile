FROM oven/bun:latest

WORKDIR /app

# Copy package files from root
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy service source code
COPY product-service/ ./product-service/

# Expose port
EXPOSE 3002

CMD ["bun", "product-service/app.ts"]
