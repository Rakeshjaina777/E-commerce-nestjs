# 📦 NestMart-Backend-NodeJS-NestJs

<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /></a>
</p>

<p align="center">
  A production-grade, scalable E-commerce backend built with <a href="http://nodejs.org" target="_blank">Node.js</a> and the powerful <a href="https://nestjs.com/" target="_blank">NestJS</a> framework.
</p>

---

## ✨ About the Project

NestMart is a robust E-commerce backend project demonstrating my deep expertise in **Node.js server-side development** with a focus on **clean architecture**, **scalability**, and **real-time microservices communication**.  
It covers advanced backend engineering concepts including **caching, message queues, event-driven architecture, role-based access control, and production-grade security practices**.

This project proves my ability to design and implement enterprise-ready solutions for real-world applications.

---

## 🚀 Technologies & Features

- **NestJS** — Modular, progressive Node.js framework
- **TypeORM** — ORM for database interaction (PostgreSQL/MySQL)
- **Redis** — High-performance caching layer for APIs
- **Custom Middleware** — Request/response logging, authentication validation
- **Global Guards** — Role-based access control (RBAC) for Admin, Seller, Customer
- **JWT Authentication** — Secure and scalable authentication system
- **RabbitMQ** — Asynchronous communication between microservices (order, payments)
- **Apache Kafka** — Real-time event streaming and analytics tracking
- **Microservices Architecture** — Event-driven and scalable system design
- **Exception Filters** — Centralized and uniform error handling
- **Environment-Based Configuration** — Secure config management using `@nestjs/config`
- **Swagger Integration** — API documentation and testing interface
- **Docker-Ready Setup** — For easy production deployments

---

## 📦 Project Setup

```bash
# Install all dependencies
$ npm install
```

---

## 🛠 Running the Application

```bash
# Start the application in development mode
$ npm run start:dev

# Start the application in production mode
$ npm run start:prod
```

The application connects to Redis, RabbitMQ, Kafka, and a SQL database (PostgreSQL/MySQL).

---

## 🧪 Testing

```bash
# Unit tests
$ npm run test

# End-to-end (e2e) tests
$ npm run test:e2e

# Code coverage
$ npm run test:cov
```

---

## 🛡️ Security and Access Control

- **JWT Authentication** for user login and route protection
- **Role-Based Guards** for Admin, Seller, and Customer authorization
- **Custom Middleware** for pre-validation of requests
- **Global Exception Handling** for error consistency

---

## 📡 Microservices Communication

- **RabbitMQ** is used for async operations (Order processing, Payment service).
- **Kafka** streams real-time events like product views, cart actions, and analytics.

Both RabbitMQ and Kafka integrations use **NestJS Microservices Module** following industry standards.

---

## 🛒 Major Functionalities

- **User Management** — Signup, login, profile management
- **Product Management** — CRUD APIs for sellers/admins
- **Shopping Cart & Checkout APIs**
- **Order Management** — Placing, updating, tracking orders
- **Admin APIs** — User control, product approvals
- **Real-Time Analytics** — Powered by Kafka streaming

---

## ☁️ Deployment

You can easily deploy the application using PM2 or Docker:

```bash
# Production build
$ npm run build

# Run with PM2
$ pm2 start dist/main.js
```

Or use **Docker** to containerize the app for cloud environments (AWS, Azure, DigitalOcean).

---

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Redis Documentation](https://redis.io/docs/)
- [RabbitMQ Documentation](https://www.rabbitmq.com/)
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [TypeORM Documentation](https://typeorm.io/)

---

## 📈 My Backend Development Expertise

This project highlights my ability to:

- Architect and build **modular, scalable backend systems**.
- Implement **highly available microservices** with **RabbitMQ** and **Kafka**.
- Integrate **Redis caching** to boost performance.
- Apply **security best practices** (Authentication, RBAC, Exception handling).
- Manage backend projects with **clean code principles** and **production-readiness**.
- Solve complex backend challenges and optimize systems for real-world use.

---
