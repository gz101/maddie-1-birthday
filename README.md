# Trivia App for Maddie's 1st Birthday Party
Users can create or join the available rooms. There are 10 predefined questions for each player to answer.

## Install dependencies
npm install

## Run project in watch mode
npm run watch

## Run project inside docker container
Build the container image:
```
docker build . -t gz101/maddie-quiz-app
```

Then run the built image:
```
docker run -p  3333:3000 -d gz101/maddie-quiz-app
```

Check the container status:
```
docker ps
```

The app should be run on:
```
http://0.0.0.0:3333/
```

## Demo
Address TBC
