# Остановить проект
docker-compose down

# Удалить образы проекта
docker-compose rm -f

# Удалить volumes проекта
docker-compose down -v

# Полная пересборка
docker-compose build --no-cache --pull
docker-compose up