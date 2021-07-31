ENVIRONMENT_FILE=.env
DOCKER_COMPOSE=docker-compose --env-file $(ENVIRONMENT_FILE)

ifneq ("$(wildcard ${ENVIRONMENT_FILE})","")
	-include ${ENVIRONMENT_FILE}
endif

copy-env-file:
	@test -e .env || cp .env.example .env

start-services:
	$(DOCKER_COMPOSE) up

install:
	npm install

lint:
	npm run lint

test:
	npm run test

wait-for-postgres:
	sleep 3

start: copy-env-file install start-services wait-for-postgres

clean:
	$(DOCKER_COMPOSE) down
