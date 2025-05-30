# Insurance App - Docker Setup

This document explains how to run the Insurance AI Assistant frontend using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)

## Quick Start

### Production Build

1. **Build the production image:**
   ```bash
   docker build -t insurance-frontend .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 3000:3000 --name insurance-app insurance-frontend
   ```

3. **Access the application:**
   Open your browser and go to `http://localhost:3000`

### Development Build (with hot reloading)

1. **Build the development image:**
   ```bash
   docker build -f Dockerfile.dev -t insurance-frontend-dev .
   ```

2. **Run with volume mounting for live code changes:**
   ```bash
   docker run -d -p 3000:3000 -v $(pwd):/app -v /app/node_modules --name insurance-app-dev insurance-frontend-dev
   ```

## Docker Compose Setup

### For Development
```bash
# Run development environment
docker-compose -f docker-compose.dev.yml up --build
```

### For Production (with backend services)
```bash
# Set up environment variables
cp .env.example .env
# Edit .env file with your actual API keys

# Run all services
docker-compose up --build
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: `http://localhost:5000`)
- `NODE_ENV`: Environment mode (`development` or `production`)
- `GROQ_API_KEY`: Required for backend services

## Container Management

### Stop containers
```bash
docker stop insurance-app
# or for development
docker stop insurance-app-dev
```

### Remove containers
```bash
docker rm insurance-app
docker rm insurance-app-dev
```

### View logs
```bash
docker logs insurance-app
```

### Access container shell
```bash
docker exec -it insurance-app sh
```

## Image Information

- **Production image size**: ~284MB (optimized multi-stage build)
- **Development image size**: ~1.26GB (includes all dev dependencies)
- **Base image**: `node:20-alpine`

## Troubleshooting

### Container won't start
- Check if port 3000 is already in use: `lsof -i :3000`
- Check container logs: `docker logs <container-name>`

### Build fails
- Clear Docker cache: `docker system prune -a`
- Ensure all dependencies are in package.json

### API connection issues
- Verify `NEXT_PUBLIC_API_URL` environment variable
- Ensure backend services are running
- Check Docker network connectivity

## Network Configuration

When running with Docker Compose, services communicate through the `insurance-network` bridge network:
- Frontend: `http://frontend:3000`
- Backend: `http://backend:5000`
- TinyLLaMA: `http://tinyllama:8000`

## Security Notes

- Production containers run as non-root user (`nextjs`)
- Environment files are excluded from Docker context
- Sensitive data should be passed via environment variables 