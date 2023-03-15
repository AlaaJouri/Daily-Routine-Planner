FROM openjdk:19

ENV ENVIROMENT=prod

MAINTAINER Alaa Jouri <alaa.joryi@hotmail.com>

EXPOSE 8080

ADD ./backend/target/app.jar app.jar

CMD ["sh", "-c", "java -jar /app.jar"]