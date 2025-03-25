# Kong Example

This is a simple example project demonstrating the use of Kong as an API gateway with a Node.js backend built using TypeScript, Hono, and Awilix for dependency injection.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Production](#production)
  - [Using Docker](#using-docker)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Kong Configuration](#kong-configuration)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Docker
- PNPM (Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mikeeggertsen/kong-example.git
   cd kong-example
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Create a `.env` file based on the `.env-example`:
   ```sh
   cp .env-example .env
   ```

4. Set the environment variables in the `.env` file:
   ```sh
   PORT=3000
   ```

## Running the Application

### Development

To run the application in development mode:

```sh
pnpm run dev
```

### Production

To build and start the application in production mode:

```sh
pnpm run node:build
pnpm run node:start
```

### Using Docker

1. Build and start the services using Docker Compose:
   ```sh
   docker-compose up --build
   ```

2. Access the application at `http://localhost:3000` or through the Kong API Gateway at `http://localhost:8000`

## Environment Variables

The `.env` file should contain the following variables:

```
PORT=3000
```

## API Endpoints

- `GET /hello-world`: Returns "Hello World"
- `GET /health`: Returns "OK"

## Kong Configuration

The `kong.yml` file contains the configuration for Kong API gateway:

```yaml
_format_version: "3.0"

services:
  - name: hello-world 
    url: http://host.docker.internal:3000
    routes:
      - name: hello-world-routes
        strip_path: false
        paths:
          - /hello-world

  - name: health
    url: http://host.docker.internal:3000
    routes:
      - name: health-routes
        strip_path: false
        paths:
          - /health

plugins:
  - name: rate-limiting
    service: hello-world
    config: 
      minute: 5
      policy: local
```

## License

This project is licensed under the MIT License.
