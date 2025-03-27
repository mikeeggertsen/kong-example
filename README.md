# Kong Example

This project demonstrates how to use **Kong** as an API gateway with a **Node.js** backend built using **TypeScript**, **Hono**, and **Awilix** for dependency injection. It includes examples of routing, rate limiting, and health checks, making it a great starting point for building scalable and secure APIs.

---

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Production with Kong API Gateway](#production-with-kong-api-gateway)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Kong Configuration](#kong-configuration)
- [Key Features](#key-features)
- [License](#license)

---

## Introduction

This repository showcases a simple yet powerful backend architecture using **Kong** as an API gateway. The backend is built with **Hono**, a lightweight web framework, and **Awilix**, a dependency injection library, to ensure modularity and scalability.

The project includes:

- A **Hello World** endpoint with rate limiting.
- A **Health Check** endpoint for monitoring.
- Declarative Kong configuration using `kong.yml`.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **Docker** (for running Kong)
- **PNPM** (Package Manager)

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

3. Create a `.env` file based on the example:
   ```sh
   cp .env-example .env
   ```

4. Set the environment variables in the `.env` file:
   ```env
   PORT=3000
   ```

---

## Running the Application

### Development

To run the application in development mode (without Kong):

```sh
pnpm run dev
```

The application will be accessible at `http://localhost:3000`.

### Production with Kong API Gateway

1. Build and start the services using Docker Compose:
   ```sh
   docker-compose up --build
   ```

2. Access the Kong API Gateway endpoints at:
   - **Proxy**: `http://localhost:8000`
   - **Admin Panel**: `http://localhost:8002`

3. The backend will only be accessible through Kong at port `8000`.

---

## Environment Variables

The `.env` file should contain the following variables:

```env
PORT=3000
```

---

## API Endpoints

The application provides the following endpoints:

### 1. **Hello World**
- **URL**: `/hello-world`
- **Method**: `GET`
- **Description**: Returns a "Hello World" message.
- **Rate Limiting**: Limited to 5 requests per minute when accessed through Kong.

### 2. **Health Check**
- **URL**: `/health`
- **Method**: `GET`
- **Description**: Returns `OK` to indicate the service is running.

#### Accessing the Endpoints:
- **Through Kong**: `http://localhost:8000/hello-world` and `http://localhost:8000/health`
- **Directly (Development Mode)**: `http://localhost:3000/hello-world` and `http://localhost:3000/health`

---

## Kong Configuration

The `kong.yml` file contains the declarative configuration for Kong:

```yaml
_format_version: "3.0"

services:
  - name: hello-world
    url: http://api:3000
    routes:
      - name: hello-world-routes
        strip_path: false
        paths:
          - /hello-world

  - name: health
    url: http://api:3000
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

### Key Points:
- **Services**: Define the backend services (`hello-world` and `health`) and their routes.
- **Rate Limiting**: The `/hello-world` endpoint is limited to 5 requests per minute.

---

## Key Features

### 1. **Kong API Gateway**
- Acts as a reverse proxy for routing and securing API traffic.
- Provides rate limiting, logging, and other features via plugins.

### 2. **Hono Framework**
- A lightweight and fast web framework for building APIs.
- Ideal for serverless and edge environments.

### 3. **Awilix Dependency Injection**
- Ensures modularity and testability by managing dependencies in a centralized container.

### 4. **TypeScript**
- Provides type safety and better developer experience.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.