# Technical Context: ScoutOS Revived Vision

## Technology Stack

### Frontend
- React 18+
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- Redux Toolkit
- React Query
- Zustand
- React Flow
- Framer Motion

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Redis
- Vector DB (Pinecone/Qdrant)
- LangChain
- OpenAI API
- Anthropic API

### DevOps
- Docker
- GitHub Actions
- AWS
- Vercel
- Datadog
- Sentry

## Development Setup

### Prerequisites
- Node.js 18+
- pnpm/npm
- Docker
- Git
- VS Code

### Environment Variables
```env
# Frontend
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WS_URL=
NEXT_PUBLIC_GA_ID=

# Backend
DATABASE_URL=
REDIS_URL=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
JWT_SECRET=
```

### Local Development
1. Clone repository
2. Install dependencies
3. Set up environment variables
4. Start development servers
5. Run tests

## Technical Constraints

### Frontend
- Browser support: Modern browsers only
- Mobile-first responsive design
- Performance budget: 2s initial load
- Bundle size limit: 200KB initial
- Memory usage: < 100MB

### Backend
- API response time: < 200ms
- Database connections: < 1000
- Rate limiting: 100 req/min
- File upload: < 100MB
- WebSocket connections: < 1000

### AI
- Token limits per request
- Model availability
- Cost constraints
- Response time limits
- Rate limiting

### Security
- HTTPS only
- JWT expiration: 1 hour
- Password requirements
- API key rotation
- Data encryption

## Dependencies

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-query": "^5.0.0",
    "zustand": "^4.0.0",
    "reactflow": "^11.0.0",
    "tailwindcss": "^3.0.0",
    "@radix-ui/react-*": "^1.0.0",
    "framer-motion": "^10.0.0"
  }
}
```

### Backend Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.11.0",
    "redis": "^4.6.0",
    "langchain": "^0.1.0",
    "openai": "^4.0.0",
    "anthropic": "^0.1.0",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0"
  }
}
```

## API Structure

### REST Endpoints
```
/api/v1
  /auth
    POST /login
    POST /register
    POST /logout
  /workflows
    GET /
    POST /
    GET /:id
    PUT /:id
    DELETE /:id
  /collections
    GET /
    POST /
    GET /:id
    PUT /:id
    DELETE /:id
  /deployments
    GET /
    POST /
    GET /:id
    PUT /:id
    DELETE /:id
```

### WebSocket Events
```
workflow:update
workflow:execute
workflow:complete
workflow:error
collection:update
collection:complete
deployment:update
deployment:status
```

## Database Schema

### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Workflows
```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  description TEXT,
  config JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Collections
```sql
CREATE TABLE collections (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  description TEXT,
  config JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Deployments
```sql
CREATE TABLE deployments (
  id UUID PRIMARY KEY,
  workflow_id UUID REFERENCES workflows(id),
  type VARCHAR(50),
  config JSONB,
  status VARCHAR(50),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Testing Strategy

### Unit Tests
- Jest for JavaScript/TypeScript
- React Testing Library
- MSW for API mocking
- Coverage target: 80%

### Integration Tests
- Cypress for E2E
- API integration tests
- WebSocket tests
- Performance tests

### Load Tests
- k6 for load testing
- Stress testing
- Endurance testing
- Spike testing

## Monitoring

### Metrics
- Response times
- Error rates
- Resource usage
- User activity
- Cost tracking

### Logging
- Application logs
- Error logs
- Access logs
- Audit logs
- Performance logs

### Alerts
- Error rate thresholds
- Response time thresholds
- Resource usage thresholds
- Cost thresholds
- Security alerts 