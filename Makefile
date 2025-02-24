install: # установить зависимости
	npm install

lint: # запуск линтера с автоматическим исправлением
	npx eslint . --fix

test: # запуск тестов
	npm test

all: install lint test

