# Kiến trúc kỹ thuật - Smart E-Learning Platform

## 📋 Tổng quan kiến trúc

Smart E-Learning Platform được thiết kế theo kiến trúc microservices với 4 thành phần chính:

1. **Backend API Service** (Go)
2. **Frontend UI Application** (React/TypeScript)  
3. **AI Processing Service** (Python)
4. **Memory/RAG System** (Python/FastAPI)

## 🏗️ Chi tiết kiến trúc từng layer

### 1. Frontend Layer (React/TypeScript)

#### Technology Stack:
- **React 19** - UI Framework với concurrent features
- **TypeScript** - Type safety và better developer experience
- **Vite** - Fast build tool với HMR
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **TanStack Router** - Type-safe routing
- **React Hook Form + Zod** - Form handling với validation

#### Architecture Pattern:
```
src/
├── components/        # Reusable UI components
├── pages/            # Route components
├── hooks/            # Custom React hooks
├── services/         # API communication
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── stores/           # State management
```

#### Key Features:
- **Authentication**: JWT-based với automatic token refresh
- **Real-time Updates**: WebSocket integration cho chat
- **Responsive Design**: Mobile-first approach
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Route-based lazy loading

### 2. Backend API Layer (Go)

#### Technology Stack:
- **Go 1.24.3** - High-performance language
- **Gin** - HTTP web framework
- **GORM** - ORM với PostgreSQL driver
- **JWT-GO** - JSON Web Token implementation
- **Zap** - Structured logging
- **Viper** - Configuration management
- **gRPC** - High-performance RPC framework

#### Architecture Pattern (Clean Architecture):
```
internal/
├── entity/           # Domain entities
├── repository/       # Data access layer
├── service/          # Business logic layer
├── router/           # HTTP route handlers
├── middleware/       # HTTP middleware
├── dto/              # Data transfer objects
├── grpc/             # gRPC client/server
└── initialize/       # Application bootstrap
```

#### Database Schema:
```sql
-- Core entities
Users (id, username, email, password_hash, role, created_at, updated_at)
Courses (id, title, description, teacher_id, created_at, updated_at)
Lessons (id, course_id, title, content, order, created_at, updated_at)
CourseMember (id, course_id, user_id, role, joined_at)
MultiChoiceQuestion (id, lesson_id, question, options, correct_answer)
```

#### Key Features:
- **RESTful API**: Standard HTTP methods và status codes
- **JWT Authentication**: Secure token-based auth
- **Role-based Access Control**: Teacher/Student permissions
- **Database Migrations**: Automated schema management
- **API Documentation**: Swagger/OpenAPI integration
- **Health Checks**: Monitoring endpoints

### 3. AI Processing Service (Python)

#### Technology Stack:
- **Python 3.9+** - AI/ML ecosystem
- **LangChain** - AI application framework
- **gRPC** - Communication với backend
- **PyPDF2** - PDF document processing
- **Protobuf** - Serialization protocol

#### Architecture Pattern:
```
tools/
├── handler/          # AI request handlers
├── lib/              # Utility libraries
├── prompts/          # AI prompt templates
├── grpc_template/    # gRPC generated code
└── main.py           # Application entry point
```

#### Key Features:
- **Lesson Plan Generation**: AI-powered curriculum creation
- **Chat AI**: Intelligent conversational assistant
- **Document Processing**: PDF extraction và analysis
- **Vietnamese Language Support**: Localized AI responses
- **Streaming Responses**: Real-time AI output

### 4. Memory/RAG System (Python/FastAPI)

#### Technology Stack:
- **FastAPI** - Modern Python web framework
- **Vector Embeddings** - Document similarity search
- **Streaming API** - Real-time data delivery
- **Pydantic** - Data validation và serialization

#### Architecture Pattern:
```
memories/L0/
├── memoryRAG.py      # Main FastAPI application
├── mcp_tool.py       # MCP protocol implementation
├── l0_chunk_embed.py # Vector embedding logic
└── config.py         # Configuration management
```

#### Key Features:
- **RAG Implementation**: Retrieval-Augmented Generation
- **Vector Search**: Semantic document search
- **MCP Protocol**: Model Context Protocol compliance
- **Multi-modal Support**: Text, audio, file processing
- **Streaming Responses**: Server-sent events

## 🔄 Inter-service Communication

### 1. Frontend ↔ Backend API
- **Protocol**: HTTP/REST over TLS
- **Authentication**: JWT Bearer tokens
- **Data Format**: JSON
- **Error Handling**: Standardized error responses

### 2. Backend API ↔ AI Service
- **Protocol**: gRPC over HTTP/2
- **Authentication**: Service-to-service tokens
- **Data Format**: Protocol Buffers
- **Features**: Streaming responses, load balancing

### 3. AI Service ↔ Memory/RAG
- **Protocol**: HTTP/REST
- **Authentication**: API keys
- **Data Format**: JSON
- **Features**: Streaming search results

## 🗄️ Database Design

### PostgreSQL Schema:
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    teacher_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id),
    title VARCHAR(200) NOT NULL,
    content TEXT,
    lesson_order INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Indexing Strategy:
- **Primary Keys**: UUID với B-tree index
- **Foreign Keys**: Composite indexes cho joins
- **Search Fields**: GIN indexes cho full-text search
- **Timestamps**: B-tree indexes cho date range queries

## 🚀 Deployment Architecture

### Development Environment:
```yaml
version: '3.9'
services:
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: smart-elearning
      POSTGRES_USER: local-user
      POSTGRES_PASSWORD: 123456
    ports:
      - "5432:5432"
  
  backend:
    build: ./api
    environment:
      DB_URL: postgres://local-user:123456@db:5432/smart-elearning
      JWT_SECRET: your-jwt-secret
    depends_on:
      - db
    ports:
      - "8080:8080"
  
  frontend:
    build: ./ui/teacher-ui
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

### Production Considerations:
- **Load Balancing**: nginx reverse proxy
- **SSL/TLS**: Let's Encrypt certificates
- **Database**: PostgreSQL cluster với read replicas
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK stack (Elasticsearch, Logstash, Kibana)
- **CI/CD**: GitHub Actions với automated testing

## 🔒 Security Architecture

### Authentication & Authorization:
- **JWT Tokens**: Short-lived access tokens (15 min)
- **Refresh Tokens**: Long-lived tokens (7 days)
- **Role-based Access**: Teacher/Student/Admin roles
- **Session Management**: Secure token storage

### Data Protection:
- **Password Hashing**: bcrypt với salt
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy
- **CORS**: Restricted cross-origin requests

### API Security:
- **Rate Limiting**: Request throttling
- **Input Validation**: Schema validation
- **Error Handling**: No sensitive data in errors
- **Audit Logging**: Security event tracking

## 📊 Performance Considerations

### Backend Optimization:
- **Database Connection Pooling**: Efficient DB connections
- **Query Optimization**: Proper indexing và joins
- **Caching**: Redis cho frequently accessed data
- **Goroutine Management**: Concurrent request handling

### Frontend Optimization:
- **Code Splitting**: Route-based lazy loading
- **Asset Optimization**: Minification và compression
- **CDN**: Static asset delivery
- **Service Worker**: Offline capability

### AI Service Optimization:
- **Model Caching**: Pre-loaded AI models
- **Streaming Responses**: Chunked output delivery
- **Request Batching**: Efficient AI processing
- **GPU Acceleration**: CUDA support cho training

## 🔧 Development Workflow

### Local Development:
1. **Database Setup**: Docker Compose PostgreSQL
2. **Backend**: Go hot reload với Air
3. **Frontend**: Vite dev server với HMR
4. **AI Service**: Python virtual environment
5. **Testing**: Unit tests + integration tests

### Code Quality:
- **Linting**: ESLint, Prettier, golangci-lint
- **Type Safety**: TypeScript strict mode
- **Testing**: Jest, Go testing, pytest
- **Code Review**: GitHub Pull Request workflow

## 📈 Monitoring & Observability

### Application Metrics:
- **Performance**: Response times, throughput
- **Business**: User activity, course completion
- **Error Tracking**: Exception monitoring
- **Resource Usage**: CPU, memory, database

### Logging Strategy:
- **Structured Logging**: JSON format
- **Log Levels**: Debug, Info, Warning, Error
- **Correlation IDs**: Request tracing
- **Centralized Logging**: ELK stack

This technical architecture provides a solid foundation for a scalable, maintainable, and secure e-learning platform.