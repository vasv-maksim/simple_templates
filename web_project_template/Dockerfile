# Использовать этот Dockerfile для создания образа:
#sudo docker build -t project_name .

# Запустить созданный обрас (image) в интерактивном режиме:
#sudo docker run -it project_name bash

FROM ubuntu:latest

MAINTAINER MAKSIM VASEV <vasvmaksim@gmail.com>

# Создать рабочую директории в /
WORKDIR /app

# Обновить индекс
RUN apt-get update && apt-get upgrade -y

# Установить vim
RUN apt install vim -y

# Установить python окружение
RUN apt install python3 -y
RUN apt install python3-pip -y
RUN pip3 install django

# Установить nodejs окружение
RUN apt install nodejs -y
RUN apt install npm -y
RUN npm install --global gulp -y
RUN npm install gulp --save-dev -y

# Скопировать директории в контейнер
COPY ./ /app

# Установить зависимости
COPY ./package.json /app
RUN npm install

RUN npm uninstall --save-dev gulp-sass
RUN npm install --save-dev gulp-sass@2


# Запустить gulp
RUN gulp

EXPOSE 9000

