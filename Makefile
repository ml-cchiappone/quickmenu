mysql-start:                 ## Will run mysql using docker composer
	docker-compose up db

mysql-stop:                   ## Will stop mysql using docker composer
	docker-compose down --remove-orphans

docker-start:                 ## Will run app using docker composer
	docker-compose up --build

docker-stop:                  ## Will stop app using docker composer
	docker-compose down --remove-orphans

clean-all:                   ## Will stop app and remove volumes using docker composer
	docker-compose down --remove-orphans --volumes
