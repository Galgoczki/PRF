npm install
npm install mongoose
npm install -g nodemon

nodemon index

docker run -d --name mongo -v $PWD/db:/data/db -p 127.0.0.1:27017:27017 mongo


connection string: mongodb://localhost:27017

npm install passport passport-local bcrypt express-session


