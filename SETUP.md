# Hướng dẫn cài đặt và triển khai - Smart E-Learning Platform

## 🚀 Cài đặt môi trường phát triển

### Yêu cầu hệ thống

#### Software Requirements:
- **Go 1.24.3+** - Backend API development
- **Node.js 18+** và **npm/yarn** - Frontend development
- **Python 3.9+** và **pip** - AI tools development
- **PostgreSQL 14+** - Database
- **Docker & Docker Compose** - Containerization
- **Git** - Version control

#### Hardware Requirements:
- **RAM**: Tối thiểu 8GB, khuyến nghị 16GB+
- **CPU**: Multi-core processor (4+ cores)
- **Storage**: 20GB+ available space
- **Network**: Stable internet connection

### 1. Cài đặt Dependencies

#### Windows:
```powershell
# Install Go
winget install GoLang.Go

# Install Node.js
winget install OpenJS.NodeJS

# Install Python
winget install Python.Python.3.11

# Install PostgreSQL
winget install PostgreSQL.PostgreSQL

# Install Docker Desktop
winget install Docker.DockerDesktop
```

#### macOS:
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install dependencies
brew install go node python postgresql docker docker-compose

# Start services
brew services start postgresql
open -a Docker
```

#### Ubuntu/Linux:
```bash
# Update package manager
sudo apt update && sudo apt upgrade -y

# Install Go
wget https://go.dev/dl/go1.24.3.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.24.3.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python
sudo apt install python3 python3-pip python3-venv

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install Docker
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 2. Clone và cấu hình dự án

```bash
# Clone repository
git clone https://github.com/Zeustakeshi/smart-elearning.git
cd smart-elearning

# Tạo file environment variables
cp .env.example .env
```

### 3. Cài đặt Database

#### Option 1: Docker (Khuyến nghị)
```bash
# Start PostgreSQL container
cd docker-compose
docker-compose -f database-compose.yml up -d

# Verify database is running
docker-compose -f database-compose.yml ps
```

#### Option 2: Local PostgreSQL
```bash
# Create database
sudo -u postgres psql
CREATE DATABASE smart_elearning;
CREATE USER local_user WITH PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE smart_elearning TO local_user;
\q
```

### 4. Cài đặt Backend API (Go)

```bash
cd api

# Install dependencies
go mod download
go mod tidy

# Create config file
cp configs/config.example.yaml configs/config.yaml

# Run database migrations
go run cmd/main.go migrate

# Start development server
go run cmd/main.go
# hoặc sử dụng Air cho hot reload
air
```

#### Environment Variables (api/.env):
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smart_elearning
DB_USER=local_user
DB_PASSWORD=123456
JWT_SECRET=your-super-secret-jwt-key-here
L2_GRPC_HOST=localhost
L2_GRPC_PORT=50051
SERVER_PORT=8080
```

### 5. Cài đặt Frontend UI (React)

```bash
cd ui/teacher-ui

# Install dependencies
npm install
# hoặc
yarn install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
# hoặc
yarn dev
```

#### Environment Variables (ui/teacher-ui/.env.local):
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WEBSOCKET_URL=ws://localhost:8080/ws
VITE_AI_CHAT_URL=http://localhost:50051
```

### 6. Cài đặt AI Tools (Python)

```bash
cd tools

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# hoặc
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Create config file
cp config.example.py config.py

# Start AI service
python main.py
```

#### Requirements.txt:
```txt
langchain
langchain-community
fastapi
uvicorn
grpcio
grpcio-tools
pypdf2
python-dotenv
pydantic
```

### 7. Cài đặt Memory/RAG System

```bash
cd memories/L0

# Activate Python virtual environment
source ../../tools/venv/bin/activate

# Install additional dependencies
pip install -r requirements.txt

# Setup vector database
python l0_chunk_embed.py --setup

# Start MCP server
python memoryRAG.py
```

## 🔧 Cấu hình môi trường

### Database Configuration

#### PostgreSQL setup:
```sql
-- Connect to PostgreSQL
psql -U local_user -d smart_elearning

-- Create necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Verify installation
SELECT version();
\l
```

### gRPC Configuration

#### Generate protocol buffers:
```bash
cd tools/grpc_template

# Install protoc compiler
# Ubuntu/Linux:
sudo apt install protobuf-compiler

# macOS:
brew install protobuf

# Windows:
# Download from https://github.com/protocolbuffers/protobuf/releases

# Generate Go code
protoc --go_out=. --go-grpc_out=. *.proto

# Generate Python code
python -m grpc_tools.protoc --python_out=. --grpc_python_out=. *.proto
```

### SSL/TLS Configuration (Production)

```bash
# Generate self-signed certificates for development
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Production: Use Let's Encrypt
certbot certonly --webroot -w /var/www/html -d yourdomain.com
```

## 🚀 Chạy ứng dụng

### Development Mode:

#### Terminal 1 - Database:
```bash
cd docker-compose
docker-compose -f database-compose.yml up
```

#### Terminal 2 - Backend API:
```bash
cd api
go run cmd/main.go
# hoặc với hot reload:
air
```

#### Terminal 3 - Frontend:
```bash
cd ui/teacher-ui
npm run dev
```

#### Terminal 4 - AI Tools:
```bash
cd tools
source venv/bin/activate
python main.py
```

#### Terminal 5 - Memory/RAG:
```bash
cd memories/L0
source ../../tools/venv/bin/activate
python memoryRAG.py
```

### Production Mode:

```bash
# Build all services
docker-compose -f docker-compose.prod.yml build

# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Monitor logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 🧪 Testing

### Backend Tests:
```bash
cd api

# Run unit tests
go test ./...

# Run with coverage
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out

# Run integration tests
go test -tags=integration ./...
```

### Frontend Tests:
```bash
cd ui/teacher-ui

# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### AI Service Tests:
```bash
cd tools

# Run Python tests
python -m pytest tests/

# Run with coverage
python -m pytest --cov=. tests/
```

## 📊 Monitoring và Debugging

### Health Checks:
```bash
# Backend API
curl http://localhost:8080/health

# Frontend
curl http://localhost:3000/

# AI Service
curl http://localhost:50051/health

# Memory/RAG
curl http://localhost:8000/health
```

### Log Monitoring:
```bash
# Backend logs
tail -f api/logs/app.log

# Frontend logs (browser console)
# Open DevTools -> Console

# AI Service logs
tail -f tools/logs/ai.log

# Database logs
docker logs smart-elearning-db
```

### Performance Profiling:
```bash
# Go profiling
go tool pprof http://localhost:8080/debug/pprof/profile

# Node.js profiling
npm run dev -- --inspect
```

## 🔒 Security Setup

### JWT Configuration:
```bash
# Generate secure JWT secret
openssl rand -hex 32

# Add to environment variables
echo "JWT_SECRET=$(openssl rand -hex 32)" >> .env
```

### Database Security:
```sql
-- Create read-only user for analytics
CREATE USER analytics_user WITH PASSWORD 'secure_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_user;

-- Enable row-level security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

### API Security:
```bash
# Install security middleware
go get github.com/gin-contrib/cors
go get github.com/gin-contrib/secure
```

## 📦 Deployment

### Docker Production Build:
```bash
# Build production images
docker build -t smart-elearning-api ./api
docker build -t smart-elearning-ui ./ui/teacher-ui
docker build -t smart-elearning-ai ./tools

# Push to registry
docker push your-registry/smart-elearning-api
docker push your-registry/smart-elearning-ui
docker push your-registry/smart-elearning-ai
```

### Kubernetes Deployment:
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

## 🛠️ Troubleshooting

### Common Issues:

#### Database Connection Error:
```bash
# Check PostgreSQL status
docker-compose -f database-compose.yml ps

# Check database logs
docker-compose -f database-compose.yml logs db

# Test connection
psql -h localhost -p 5432 -U local_user -d smart_elearning
```

#### Frontend Build Error:
```bash
# Clear node_modules và package-lock.json
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force

# Update dependencies
npm update
```

#### Go Module Issues:
```bash
# Clean module cache
go clean -modcache

# Re-download dependencies
go mod download
go mod tidy
```

#### Python Environment Issues:
```bash
# Recreate virtual environment
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Performance Issues:

#### Database Performance:
```sql
-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Analyze table statistics
ANALYZE;
```

#### Memory Usage:
```bash
# Monitor memory usage
docker stats

# Check Go memory usage
go tool pprof http://localhost:8080/debug/pprof/heap
```

## 📚 Additional Resources

- [Go Documentation](https://golang.org/doc/)
- [React Documentation](https://reactjs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [gRPC Documentation](https://grpc.io/docs/)

---

Nếu gặp vấn đề trong quá trình cài đặt, vui lòng tạo issue trên GitHub hoặc liên hệ team phát triển.