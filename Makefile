
# ----------------------------
# Настройки
# ----------------------------
COMPOSE=docker-compose
NUXT_DIR=./workspace/nuxt

# ----------------------------
# Команды
# ----------------------------

# Dev-режим: горячая перезагрузка Nuxt
dev:
	@echo "Очистка кэша"
	$(MAKE) clean-nuxt
	@echo "Запуск проекта в режиме разработки (hot reload)..."
	$(COMPOSE) up --build

# Очистка Nuxt кэша и сборки
clean-nuxt:
	@echo "Очистка кэша Nuxt..."
	sudo rm -rf $(NUXT_DIR)/.nuxt $(NUXT_DIR)/.output
	docker volume rm $$(docker volume ls -q | grep nuxt-cache) || true

# Prod-режим: билд + запуск в фоне
prod:
	@echo "Сборка и запуск проекта в продакшн-режиме..."
	$(COMPOSE) build --build-arg MODE=production
	$(COMPOSE) up -d

# Остановка всех контейнеров
stop:
	$(COMPOSE) down

# Очистка данных базы и контейнеров
clean:
	$(COMPOSE) down -v --remove-orphans

# Логи Nuxt в реальном времени
logs:
	$(COMPOSE) logs -f nuxt
