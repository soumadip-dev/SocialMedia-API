<h1 align="center">SocialMedia-API 🔗</h1>

<p align="center">
  A scalable social media backend service built with Express.js, Redis, RabbitMQ, and modern tools, featuring rate limiting and a microservice architecture with asynchronous messaging.
</p>

---

## 🔋 Key Features

- **🔐 Secure Authentication** – JWT-based authentication with access and refresh tokens
- **🧾 User Registration & Login** – User signup, login, logout, and token refresh functionality
- **📝 Post Management System** – Create, retrieve (single & paginated), and delete posts
- **🗂️ Media Handling** – Upload media files and fetch uploaded media
- **🔍 Search & Indexing** – Full-text search for posts with asynchronous indexing via RabbitMQ
- **⚡ Performance Optimized** – Redis caching for tokens, posts, and frequently accessed data
- **🛡️ API Security** – Rate limiting, Helmet, and CORS protection
- **🔄 Event-Driven Microservices** – Asynchronous communication using RabbitMQ events (post.created, media.upload)
- **🧩 API Gateway Pattern** – Centralized request routing to independently deployable services
- **📊 Logging & Monitoring** – Centralized logging with Winston for better observability

---

## 📡 Service Interaction Flow

```
+--------+           +-------------+     +-------------+          +--------------+         +--------------+         +-----------+
| Client |           | API Gateway |     | Post Service|          |Search Service|         | Media Service|         | RabbitMQ  |
+--------+           +-------------+     +-------------+          +--------------+         +--------------+         +-----------+
    |                      |                      |                      |                       |                          |
    | Create Post Requsest |                      |                      |                       |                          |
    |--------------------->|                      |                      |                       |                          |
    |                      | Forward Request      |                      |                       |                          |
    |                      |--------------------->|                      |                       |                          |
    |                      |                      |                      |     Publish post.created.event                   |
    |                      |                      |------------------------------------------------------------------------>|
    |                      |                      |                      |                       |                          |
    |                      | Post Created Response|                      |                       |                          |
    |                      |<---------------------|                      |                       |                          |
    |                      |                      |                      |                       |                          |
    | Post Created Response|                      |                      |                       |                          |
    |<---------------------|                      |                      |                       |                          |
    |                      |                      |                      |        Consume post.created.event                |
    |                      |                      |                      |<-------------------------------------------------|
    |                      |                      |                      |                       |                          |
    |                      |                      |                      |----                   |                          |
    |                      |                      |                      |    | Index new Post   |                          |
    |                      |                      |                      |<---                   |                          |
    |                      |                      |                      |                       |                          |
    |                      |                      |                      |                       |Consume post.created.event|
    |                      |                      |                      |                       |<-------------------------|
    |                      |                      |                      |                       |                          |
    |                      |                      |                      |                       |----                      |
    |                      |                      |                      |                       |    | Process media       |
    |                      |                      |                      |                       |<---                      |
    | Search Requsest      |                      |                      |                       |                          |
    |--------------------->|                      |                      |                       |                          |
    |                      |              Forward Request                |                       |                          |
    |                      |-------------------------------------------->|                       |                          |
    |                      |                      |                      |                       |                          |
    |                      |               Search Result                 |                       |                          |
    |                      |<--------------------------------------------|                       |                          |
    |                      |                      |                      |                       |                          |
    |   Search Requsest    |                      |                      |                       |                          |
    |<---------------------|                      |                      |                       |                          |
    | Upload Media Requsest|                      |                      |                       |                          |
    |--------------------->|                      |                      |                       |                          |
    |                      |                      |                      |                       |                          |
    |                      |                      |  Forward Request     |                       |                          |
    |                      |-------------------------------------------------------------------->|                          |
    |                      |                      |                      |                       |                          |
    |                      |                      |                      |                       |Publish media.upload event|
    |                      |                      |                      |                       |------------------------->|
    |                      |                      |  Upload Success respons                      |                          |
    |                      |<--------------------------------------------------------------------|                          |
    |                      |                      |                      |                       |                          |
    |                      |                      |                      |                       |                          |
    |  Upload Success Res  |                      |                      |                       |                          |
    |<---------------------|                      |                      |                       |                          |
    |                      |                      |                      |                       |                          |
    |                      |                      |                      |   Consume media.upload event                     |
    |                      |                      |<------------------------------------------------------------------------|
    |                      |                      |                      |                       |                          |
    |                      |                      |                      |                       |                          |
    |                      |                      |----  upload post     |                       |                          |
    |                      |                      |    | with media      |                       |                          |
    |                      |                      |<---                  |                       |                          |
    |                      |                      |                      |                       |                          |
+--------+           +-------------+     +-------------+          +--------------+         +--------------+        +-----------+
| Client |           | API Gateway |     | Post Service|          |Search Service|         | Media Service|        | RabbitMQ  |
+--------+           +-------------+     +-------------+          +--------------+         +--------------+        +-----------+

```

---

## ⚙️ Tech Stack

- **🧠 Framework**: Express.js
- **🗄️ Primary Database**: MongoDB with Mongoose ORM
- **⚡ Caching**: Redis
- **📊 Monitoring**: Winston for logging
- **🔒 Security**: Helmet, CORS, rate limiting
- **🪪 Validation**: Joi
- **🐇 Message Broker**: RabbitMQ for asynchronous communication
- **🐳 Containerization**: Docker & Docker Compose

---

## 🤸 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- Redis (v7+)
- MongoDB (v6+)
- Erlang/OTP (v28.3)
- RabbitMQ (v3.12+)
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
POST_SERVICE_URL=http://localhost:8083
MEDIA_SERVICE_URL=http://localhost:8082
SEARCH_SERVICE_URL=http://localhost:8084

REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000

JWT_SECRET=super_strong_jwt_secret_key

```

Create a `.env` file in the `identity-service` folder:

```env
NODE_ENV=development
PORT=8081

MONGO_URI=mongodb://localhost:27017/socialmedia_identity
JWT_SECRET=super_strong_jwt_secret_key

FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379
```

Create a `.env` file in the `media-service` folder:

```env
NODE_ENV=development
PORT=8082

MONGO_URI=mongodb://localhost:27017/socialmedia_media
FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RABBITMQ_URL=amqp://localhost:5672
```

Create a `.env` file in the `post-service` folder:

```env
NODE_ENV=development
PORT=8083

MONGO_URI=mongodb://localhost:27017/socialmedia_posts
FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379

RABBITMQ_URL=amqp://localhost:5672
```

Create a `.env` file in the `search-service` folder:

```env
NODE_ENV=development
PORT=8084

MONGO_URI=mongodb://localhost:27017/socialmedia_search
FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379

RABBITMQ_URL=amqp://localhost:5672
```

---

### 3. Install Dependencies

Install dependencies for each service separately.

```bash
# API Gateway
cd api-gateway
npm install

# Identity Service
cd ../identity-service
npm install

# Media Service
cd ../media-service
npm install

# Post Service
cd ../post-service
npm install

# Search Service
cd ../search-service
npm install
```

---

### 4. Start Required Infrastructure Services

Make sure the following services are running locally **before starting the application**:

- **MongoDB**
- **Redis**
- **RabbitMQ**

Verify they are accessible on their default ports:

- MongoDB → `27017`
- Redis → `6379`
- RabbitMQ → `5672`

---

### 5. Start Each Service in a Separate Terminal Window

Each microservice must be started in a **different terminal window**.

#### Terminal 1 – API Gateway

```bash
cd api-gateway
npm run dev
```

#### Terminal 2 – Identity Service

```bash
cd identity-service
npm run dev
```

#### Terminal 3 – Media Service

```bash
cd media-service
npm run dev
```

#### Terminal 4 – Post Service

```bash
cd post-service
npm run dev
```

#### Terminal 5 – Search Service

```bash
cd search-service
npm run dev
```

---

### 6. Service Availability

After successful startup, the services will be available at:

- API Gateway: `http://localhost:8080`
- Identity Service: `http://localhost:8081`
- Media Service: `http://localhost:8082`
- Post Service: `http://localhost:8083`
- Search Service: `http://localhost:8084`

The system is now ready to accept requests through the API Gateway.

---

## 🔌 API Endpoints

### Authentication

- `POST /api/v1/auth/register` – Register a new user
- `POST /api/v1/auth/login` – Log in a user
- `POST /api/v1/auth/refresh-token` – Refresh access token
- `POST /api/v1/auth/logout` – Log out a user

### Posts

- `POST /api/v1/post/create-post` – Create a new post
- `GET /api/v1/post/posts?page=&limit=` – Get all posts (paginated)
- `GET /api/v1/post/:id` – Get a post by ID
- `DELETE /api/v1/post/:id` – Delete a post by ID

### Media

- `GET /api/v1/media` – Get all media files
- `POST /api/v1/media/upload` – Upload media

### Search

- `GET /api/v1/search/posts?query=` – Search posts

---
