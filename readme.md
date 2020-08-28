# DoctaHsieh Multiplayer Node.js Game

## How to set up

```aidl
npm install
```
Install the latest version of MongoDB. 
Check that you have socket.io and express in your node_modules folder.
Open up the bin folder of your MongoDB in the command line, and then enter the following:

```
use myGame
db.createCollection("account");
db.createCollection("progress");
```

Open your project folder in the command line and run 
```
npm install mongojs
```

## How to run
In the Project command line, run
```
node app.js
``` 
In the MongoDB command line, run 
```
mongo
use myGame
```
