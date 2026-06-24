FROM oven/bun:1 AS base
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN bun install

COPY . .

EXPOSE 8787
CMD ["bun", "run", "src/index.ts"]
