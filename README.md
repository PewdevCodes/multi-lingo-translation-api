# multi-lingo-translation-api

A translation REST API built with Node.js and Express. Supports multiple translation providers (Google Translate for now), API key authentication, and Redis caching.

## Current Status

**What's done so far:**

- Express server with basic middleware (CORS, Helmet, Morgan)
- `POST /api/translate` endpoint
- API key authentication via `x-api-key` header
- Google Translate integration (provider pattern — easy to add more later)
- Redis caching for translation results (24h TTL)
- Centralized error handling
- Health check endpoint at `GET /health`

**What's not done yet:**

- Database integration (pg is installed but unused)
- BullMQ job queues / workers
- JWT auth (jsonwebtoken is installed but unused)
- Tests

## Project Structure

```
server.js                         # Entry point
src/
  app.js                          # Express app setup + middleware + error handler
  config/
    redis.js                      # Redis client
  controllers/
    translateController.js        # HTTP layer — thin, delegates to service
  middleware/
    apiKeyAuth.js                 # API key validation middleware
  providers/
    index.js                      # Provider router (picks google, etc.)
    googleProvider.js             # Google Translate API call
  routes/
    translateRoutes.js            # Route definitions
  services/
    translateService.js           # Business logic, validation, caching
  db/                             # (empty — not yet implemented)
  queues/                         # (empty — not yet implemented)
  workers/                        # (empty — not yet implemented)
  utils/                          # (empty — not yet implemented)
```

## Setup

1. Clone the repo
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root:
   ```
   PORT=3000
   API_KEY=your-api-key-here
   GOOGLE_API_KEY=your-google-translate-api-key
   REDIS_URL=redis://localhost:6379
   PROVIDER=google
   ```
4. Make sure Redis is running locally (or update `REDIS_URL`)
5. Start the server:
   ```
   node server.js
   ```
   Or with nodemon:
   ```
   npx nodemon server.js
   ```

## API

### Health Check

```
GET /health
```

Returns `{ "status": "ok" }`

### Translate

```
POST /api/translate
```

**Headers:**
| Header | Required | Description |
|---|---|---|
| `x-api-key` | Yes | Your API key (must match `API_KEY` in `.env`) |
| `Content-Type` | Yes | `application/json` |

**Body:**

```json
{
  "text": "Hello",
  "source": "en",
  "target": "es"
}
```

- `text` — required
- `target` — required (language code)
- `source` — optional, defaults to `"auto"`

**Response:**

```json
{
  "source": "en",
  "target": "es",
  "originalText": "Hello",
  "translatedText": "Hola"
}
```

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Translation:** Google Translate API (v2)
- **Caching:** Redis (via ioredis)
- **Security:** Helmet, CORS, API key auth
- **Logging:** Morgan
