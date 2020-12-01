let express = require('express');
let app = express();
let jwt = require('jsonwebtoken');
let WebSocket = require('ws');

let bodyParser = require('body-parser');
let composersController = require('./controllers/composersController');
let attacksAndBuffsController = require('./controllers/attacksBuffsController');
let itemsController = require('./controllers/itemsController');
let roomController = require('./controllers/roomController');
let teamsController = require('./controllers/teamsController');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); 

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json())

app.post("/createRoom", (req, res) => {
    let roomInfo = roomController.createRoom(req);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(roomInfo);
        }
    });
    res.send(200, roomInfo);
}); 

app.post("/createTeam", teamsController.createTeam)

// app.post("/getEndGame", )

app.delete("/deleteRoom", roomController.deleteRoom);

app.delete("/deleteTeam", teamsController.deleteTeam);

// app.put("/makeTurn", )

app.get("/composers", composersController.getAllComposers);

app.get("/attacksAndBuffs", attacksAndBuffsController.getAllAttacksAndBuffs);

app.get("/items", itemsController.getAllItems);

// app.get("/creatorsTeams", )

// app.get("/currentGameState", )

// app.get("/recentMatches", )

app.get("/getRooms", roomController.getCurrentRooms);

app.put("/joinRoom", roomController.joinRoom)

app.listen(4000, () => console.log('Server ready @ port 4000'));





// --------------- Create WebSocket connection.

wss.on("connection", ws => {
    console.log("New client connected!")

    ws.on("message", data => {
        console.log(data)
        // We might not need this function since we'd just be using actual POST/GET requests
        ws.send(data); // we gotta process it first 
    })

    ws.on("close", () => {
        console.log("Client disconnected.");
    })
});
