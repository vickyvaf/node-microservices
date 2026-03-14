FROM oven/bun:latest

WORKDIR /app

# Copy package files from root
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy service source code
COPY user-service/ ./user-service/

# Expose port
EXPOSE 3001

CMD ["bun", "user-service/app.ts"]
