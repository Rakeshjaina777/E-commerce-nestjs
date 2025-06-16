# 🧠 NestMart Backend – NestJS + PostgreSQL + Prisma

A production-ready, modular, and scalable backend for a modern e-commerce platform. Built with **NestJS**, **PostgreSQL**, and **Prisma ORM**, it supports authentication, RBAC, product and order management, and real-time microservice communication with RabbitMQ and Kafka.

---

## 🚀 Tech Stack

| Layer            | Tool                             |
| ---------------- | -------------------------------- |
| Backend          | [NestJS](https://nestjs.com/)    |
| ORM              | [Prisma](https://www.prisma.io/) |
| Database         | PostgreSQL                       |
| Auth/Guard       | JWT + RolesGuard                 |
| Message Queue    | RabbitMQ, Kafka                  |
| API Docs         | Swagger + OpenAPI                |
| Caching          | Redis                            |
| Containerization | Docker + Docker Compose          |

---

## 🛠️ Local Installation

```bash
# Clone the repository
git clone https://github.com/your-org/nestmart-backend.git
cd nestmart-backend

# Install dependencies
npm install

# Create environment config
cp .env.example .env

# Start local PostgreSQL if not using Docker
docker run -d --name nestmart-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres

# Migrate the database schema
npx prisma migrate dev --name init

# Optional: Seed test data
npm run seed

# Start the dev server
npm run start:dev
```

---

## 🐳 Docker Setup

```bash
# Build and run backend + DB using docker-compose
docker-compose up --build
```

* Backend: [http://localhost:3000](http://localhost:3000)
* Swagger Docs: [http://localhost:3000/api](http://localhost:3000/api)
* PostgreSQL: exposed on port 5432

---

## 📁 Folder Structure

```
src/
├── common/            # DTOs, enums, guards, middleware, filters, utils
├── modules/           # Modular features (auth, user, product, order)
├── prisma/            # Prisma schema, seed, and client
├── config/            # App and env config
├── core/              # Swagger, logger setup
├── main.ts            # App bootstrap
```

---

## 🧠 Prisma Schema & Relationships

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role
  products  Product[]
  orders    Order[]
}

model Product {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Float
  stock       Int
  categoryId  String
  sellerId    String
  seller      User     @relation(fields: [sellerId], references: [id])
  category    Category @relation(fields: [categoryId], references: [id])
}

model Order {
  id       String       @id @default(uuid())
  userId   String
  user     User         @relation(fields: [userId], references: [id])
  items    OrderItem[]
  createdAt DateTime    @default(now())
}

model OrderItem {
  id        String   @id @default(uuid())
  orderId   String
  productId String
  quantity  Int
  product   Product @relation(fields: [productId], references: [id])
  order     Order   @relation(fields: [orderId], references: [id])
}

enum Role {
  ADMIN
  SELLER
  CUSTOMER
}
```

---

## 🌐 API Documentation (Swagger)

Available at: **[http://localhost:3000/api](http://localhost:3000/api)**

---

## 🔮 Sample API Usage

### `POST /auth/signup`

```json
{
  "email": "user@mail.com",
  "password": "securepass",
  "role": "CUSTOMER"
}
```

### `POST /products`

Requires seller/admin token.

```json
{
  "name": "Macbook Pro",
  "description": "2024 M3 chip",
  "price": 2499.99,
  "stock": 10,
  "categoryId": "uuid-category"
}
```

### `POST /orders`

```json
{
  "items": [
    { "productId": "uuid-product", "quantity": 1 }
  ]
}
```

---

## 🪤 Environment Variables

| Key            | Example                                    | Description               |
| -------------- | ------------------------------------------ | ------------------------- |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost` | Prisma DB URL             |
| `PORT`         | `3000`                                     | App port                  |
| `JWT_SECRET`   | `supersecurekey`                           | JWT signing key           |
| `REDIS_URL`    | `redis://localhost:6379`                   | Redis for caching         |
| `RABBITMQ_URL` | `amqp://localhost:5672`                    | RabbitMQ for queues       |
| `KAFKA_BROKER` | `localhost:9092`                           | Kafka for event streaming |

---

## 🛡 Security Features

* ✅ Helmet-based HTTP headers
* ✅ CORS configuration
* ✅ Global DTO validation
* ✅ Role-based route guards
* ✅ JWT-secured endpoints
* ✅ Global exception handling
* ✅ Logging & Interceptors

---

## 🧰 Future Enhancements

* **🔒 Advanced RBAC** with dynamic permissions and claims
* **⏰ Cron Jobs + Redis** for analytics/report caching
* **⚙️ BullMQ + Redis** for background processing
* **📱 Real-time Order Tracking** via WebSockets
* **📊 Admin Dashboard Export** with PDF support
* **🏢 SaaS Multi-Tenancy** support for vendor segregation

---

## 👨‍💻 Author & Maintainer

* 👤 **Author**: Rakesh Jain
* 💼 **LinkedIn**: [https://www.linkedin.com/in/your-link/](https://www.linkedin.com/in/rakesh-jain-b93b28223/)
* 🛠 Stack: NestJS · PostgreSQL · Prisma · Swagger · Redis · Kafka · RabbitMQ · Docker
