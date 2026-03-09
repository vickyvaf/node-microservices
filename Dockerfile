FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy all source code
COPY . .

# The command is expected to be overridden by docker-compose
CMD ["bun", "index.js"]
