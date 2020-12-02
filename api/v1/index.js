let express = require('express');
let https = require('https');
let cors = require('cors')
let app = express();
let jwt = require('jsonwebtoken');
let WebSocket = require('ws');

let bodyParser = require('body-parser');
let composersController = require('./controllers/composersController');
let attacksAndBuffsController = require('./controllers/attacksBuffsController');
let itemsController = require('./controllers/itemsController');
let roomController = require('./controllers/roomController');
let teamsController = require('./controllers/teamsController');
let gameController = require('./controllers/gameController');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.post("/createRoom", (req, res) => {
    let roomInfo = JSON.stringify(roomController.createRoom(req));
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send("1" + roomInfo);
        }
    });
    console.log("New Room: " + roomInfo);
    res.status(200).send(roomInfo);
});

app.post("/createTeam", teamsController.createTeam);

// app.post("/getEndGame", );

app.delete("/deleteRoom", roomController.deleteRoom);

app.delete("/deleteTeam", teamsController.deleteTeam);

// app.put("/makeTurn", );

app.get("/composers", composersController.getAllComposers);

app.get("/attacksAndBuffs", attacksAndBuffsController.getAllAttacksAndBuffs);

app.get("/items", itemsController.getAllItems);

app.get("/creatorsTeams", teamsController.getCreatorsTeams);

// app.get("/currentGameState", );

app.get("/recentMatches", gameController.getRecentMatches);

app.get("/getTeams", teamsController.getAllTeams);

app.get("/getRooms", roomController.getCurrentRooms);

app.put("/joinRoom", roomController.joinRoom);

app.listen(4000, () => console.log('Server ready @ port 4000'));




// --------------- Create WebSocket connection.

const server = https.createServer(app);
const wss = new WebSocket.Server({ port: 8082 }); 

wss.on("connection", ws => {
    console.log("New client connected!");

    ws.on("message", data => {
        console.log(data);
        // We might not need this function since we'd just be using actual POST/GET requests
        ws.send(data); // we gotta process it first 
    });

    ws.on("close", () => {
        console.log("Client disconnected.");
    });
});
