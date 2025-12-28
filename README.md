<h1 align="center">SocialMedia-API 🔗</h1>

<p align="center">
  A scalable social media backend service built with Express.js, Redis, and modern tools, featuring rate limiting and a microservice architecture.
</p>

---

## 🔋 Key Features

- **🔐 Secure Authentication** – JWT-based authentication with refresh tokens
- **👥 User Management** – Complete CRUD operations for user profiles
- **📱 Post & Content System** – Create, read, update, and delete posts with media support
- **💬 Real-time Messaging** – WebSocket-based chat system with message persistence
- **👍 Engagement Features** – Like, comment, and share functionality
- **🔍 Advanced Search** – Elasticsearch-powered content discovery
- **📊 Analytics Dashboard** – User activity and engagement metrics
- **⚡ Performance Optimized** – Redis caching for frequently accessed data
- **🛡️ Rate Limiting** – Protect against abuse with configurable rate limits
- **📨 Notification System** – Real-time push and email notifications
- **🔄 Microservice Architecture** – Independently deployable services

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    API Gateway (Express)                         │
├──────────────┬──────────────┬─────────────────┬──────────────────┤
│ Auth Service │ User Service │Content Service  │ Chat Service     │
├──────────────┴──────────────┴─────────────────┴──────────────────┤
│                    Redis (Cache)                                 │
├──────────────────────────────────────────────────────────────────┤
│                    MongoDb (Primary DB)                          │
└──────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

- **🧠 Framework**: Express.js
- **🗄️ Primary Database**: MongoDB with Mongoose ORM
- **⚡ Caching**: Redis
- **📊 Monitoring**: Winston for logging
- **🔒 Security**: Helmet, CORS, rate limiting
- **🪪 Validation**: Joi
- **🐳 Containerization**: Docker & Docker Compose

---

## 🤸 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- Redis (v7+)
- MongoDB (v6+)
- Docker & Docker Compose (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/soumadip-dev/SocialMedia-API.git
cd SocialMedia-API
```

### 2. Environment Configuration

Create a `.env` file in the `api-gateway` folder:

```env
PORT=8080
NODE_ENV=development
IDENTITY_SERVICE_URL=http://localhost:8081
REDIS_URL=redis://localhost:6379
FRONTEND_URL=<YOUR_FRONTEND_URL>
```

Create a `.env` file in the `identity-service` folder:

```env
NODE_ENV=development
PORT=8081
MONGO_URI=<YOUR_MONGODB_URL>
JWT_SECRET=<YOUR_JWT_SECRET>
FRONTEND_URL=<YOUR_FRONTEND_URL>
REDIS_URL=redis://localhost:6379
```

---

## 🚀 API Endpoints

### Authentication

- `POST /api/v1/auth/register` – Register new user
- `POST /api/v1/auth/login` – Login user
- `POST /api/v1/auth/refresh-token` – Refresh access token
- `POST /api/v1/auth/logout` – Logout user

---

<p align="center">
  Made with ❤️ by Soumadip Majila
</p>
