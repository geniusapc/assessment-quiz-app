# ====================================================
# 📦 Project Makefile
# Manage Docker, Database, Linting, and more
# ====================================================

PROJECT_NAME := quiz-app

OS := $(shell uname 2>/dev/null || echo Windows)

.DEFAULT_GOAL := help

# ------------------------------
# 🚢 Docker Commands
# ------------------------------
docker-up: ## Build and start containers (foreground)
	docker compose up --build

docker-upd: ## Build and start containers (detached)
	docker compose up -d --build

docker-down: ## Stop and remove containers
	docker compose down

docker-restart: ## Restart containers without rebuild
	docker compose restart

docker-rebuild: ## Full rebuild and restart (slower)
	docker compose down && docker compose up --build -d

docker-clean: ## Remove containers, images, volumes, orphans
	docker compose down --rmi all --volumes --remove-orphans

docker-prod: ## Run with production config
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

docker-ps: ## Show running containers
	docker compose ps

docker-logs: ## Show all logs
	docker compose logs -f

docker-logs-service: ## Show logs for a service (make docker-logs-service SERVICE=frontend)
	docker compose logs -f $(SERVICE)

docker-build: ## Build images without starting
	docker compose build

# ------------------------------
# 🗄️ Database Commands
# ------------------------------
db-migrate: ## Run database migrations
	npm run migration:run


# ------------------------------
# 🧾 Utility
# ------------------------------
ifeq ($(OS),Windows)
help: ## Show this help (Windows)
	@echo.
	@echo Available commands for $(PROJECT_NAME):
	@echo.
	@for /f "tokens=1,* delims=:" %a in ('findstr /R "^[a-zA-Z0-9_-]*:.*##" Makefile') do @echo   %a    %b
else
help: ## Show this help (Linux/macOS)
	@echo ""
	@echo "Available commands for $(PROJECT_NAME):"
	@echo ""
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}'
	@echo ""
endif