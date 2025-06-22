SSH_USER := $(shell id -u)
SSH_GROUP := $(shell id -g)


start: 
	docker compose up -d
stop: 
	docker compose stop
restart: stop start

npm-install-truc:
	@echo "npm install"
	@docker run -it --rm --network=host -u $(SSH_USER):$(SSH_GROUP) -v .:/usr/app node_medoucine /usr/local/bin/npm i framer-motion


npm-create:
	@echo "npm create"
	@docker run -it --rm --network=host -u $(SSH_USER):$(SSH_GROUP) -v .:/usr/app node_medoucine /usr/local/bin/npx create-next-app@latest home-page --use-npm


npm-install-ollama:
	@echo "npm install"
	@docker run -it --rm --network=host -u $(SSH_USER):$(SSH_GROUP) -v .:/usr/app node_medoucine /usr/local/bin/npm install
