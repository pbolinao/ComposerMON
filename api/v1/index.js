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
let loginController = require('./controllers/loginController');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.post("/getToken", loginController.authUser);

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

// app.put("/makeTurn", );  // CRUD Update

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

let webSockets = {};
let rooms = {};

wss.on("connection", ws => {
    let userID = getUniqueClientID();
    ws.id = userID;
    webSockets[userID] = ws;
    console.log("New client connected! User: " + userID);

    ws.on("message", data => {
        data = JSON.parse(data);
        let roomID = data.room;
        
        if (data.meta == 'create') {
            rooms[roomID] = [userID];
            console.log(rooms);
        } else if (data.meta == 'join') {
            // check if room is full first
            let tempArr = rooms[roomID];
            if (tempArr.length < 2) {
                tempArr.push(userID)
                rooms[roomID] = tempArr;
                let roomINFO = currentRooms[roomID];
                roomINFO.numPlayers = 2;
                currentRooms[roomID] = roomINFO;
                // send to all users
                // this should also allow the user to actually join the room lul (hopefully this makes a promise)
                console.log(rooms);
            }
        } else if (data.meta == 'leave') {
            let index = rooms[roomID].indexOf(userID);
            rooms[roomID].splice(index, 1);
            // edit numPlayers
            // send to host
            //
        }
    });

    ws.on("close", () => {
        delete webSockets[userID];
        console.log("Client " + userID + " disconnected.");
    });
});


function getUniqueClientID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};