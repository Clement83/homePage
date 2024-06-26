start:
	docker-compose up --build -d
stop:
	docker-compose stop
restart: stop start 

follow:
	docker-compose up --build