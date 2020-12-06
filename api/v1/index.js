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
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "DSAFFA$W#FA$F%@143fWEf3f", (err, decode) => {
            if (err) {
                return res.status(401).json({message: 'Unauthorized user'})
            } else {
                let roomInfo = JSON.stringify(roomController.createRoom(req));
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                    client.send("1" + roomInfo);
                    }
                });
                console.log("New Room: " + roomInfo);
                res.status(200).send(roomInfo);
            };
        });
    } else {
        return res.status(401).json({message: 'Unauthorized user'});
    };
});

app.post("/createTeam", teamsController.createTeam);

app.post("/getEndGame", gameController.getGameEnd);

app.post("/createGameState", gameController.createGameState);

app.delete("/deleteTeam", teamsController.deleteTeam);

app.put("/makeTurn", gameController.makeTurn);

app.get("/composers", composersController.getAllComposers);

app.get("/attacksAndBuffs", attacksAndBuffsController.getAllAttacksAndBuffs);

app.get("/items", itemsController.getAllItems);

app.get("/creatorsTeams", teamsController.getCreatorsTeams);

app.get("/currentGameState", gameController.getCurrentGameState);

app.get("/recentMatches", gameController.getRecentMatches);

app.get("/getTeams", teamsController.getAllTeams);

app.get("/getTeam/:teamID", teamsController.getTeam);

app.get("/getComposer/:composer", composersController.getComposer);

app.get("/getRooms", roomController.getCurrentRooms);

app.listen(4000, () => console.log('Server ready @ port 4000'));




// --------------- Create WebSocket connection for the main menu.

const server = https.createServer(app);
const wss = new WebSocket.Server({ port: 8082 }); 
const wssBattle = new WebSocket.Server({ port: 8083 });

let webSockets = {};
let rooms = {};

let webSocketsBattle = {};
let battleRooms = {};
let bRoomsTurns = {}

wss.on("connection", ws => {
    let userID = getUniqueClientID();
    let hosting = false;
    let hostedRoomID = null;
    ws.id = userID;
    webSockets[userID] = ws;
    console.log("New client connected! User: " + userID);

    ws.on("message", data => {
        data = JSON.parse(data);
        let roomID = data.room;

        let currentRooms = roomController.getCurrentRoomsNoRes();
        
        if (data.meta == 'create') {
            rooms[roomID] = [userID];
            hosting = true;
            hostedRoomID = roomID;
            console.log(rooms);
            ws.send('room-created');
        } else if (data.meta == 'join') {
            // check if room is full first
            let roomINFO = currentRooms[roomID];
            if (roomINFO.numPlayers < 2) {
                let tempArr = rooms[roomID];
                let p2Name = data.name;
                if (tempArr && tempArr.length < 2) {
                    tempArr.push(userID)
                    rooms[roomID] = tempArr;
                    roomINFO.numPlayers = 2;
                    roomINFO['player2'] = p2Name;
                    currentRooms[roomID] = roomINFO;
                    roomController.updateRoom(roomID, roomINFO);

                    ws.send('2' + JSON.stringify(roomINFO)) // send to this user
                    // send to the host
                    let hostWS = webSockets[tempArr[0]];
                    hostWS.send('2' + JSON.stringify(roomINFO));

                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                        client.send("z" + JSON.stringify(roomINFO));
                        }
                    });
                    console.log(rooms);
                }
            } else {
                ws.send("Sorry, but this room is full!");
            }

        } else if (data.meta == 'leave') {
            let tempArr = rooms[roomID];
            console.log(tempArr);
            let roomINFO = currentRooms[roomID];
            let index = tempArr.indexOf(userID);
            if (index == 0) {
                // host left, kill the room
                roomController.deleteRoomNoRes(roomID);
                delete rooms[roomID];
                hosting = false;
                hostedRoomID = null;

                // send to all players (value of 4)
                ws.send('4' + JSON.stringify(roomINFO)) 
                // send to the host 
                if (roomINFO.numPlayers == 2) {
                    let p2WS = webSockets[tempArr[1]];
                    p2WS.send('4' + JSON.stringify(roomINFO));
                }
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send("x" + JSON.stringify(roomINFO));
                    }
                });
                console.log(roomID + " -- Host Left, deleting room.");
            } else {
                rooms[roomID].splice(index, 1);
                // update numplayers
                roomINFO.numPlayers = 1;
                roomINFO['player2'] = 'Player 2';
                currentRooms[roomID] = roomINFO;
                roomController.updateRoom(roomID, roomINFO);

                // send a value of 4 to player 2
                ws.send('4' + JSON.stringify(roomINFO)) 
                // send to the host value of 3 (let all clients know that they left aswell)
                let hostWS = webSockets[tempArr[0]];
                hostWS.send('3' + JSON.stringify(roomINFO));
                console.log(roomID + " -- Player 2 left");
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send("z" + JSON.stringify(roomINFO));
                    }
                });
            }
        } else if (data.meta == 'start') {
            let tempArr = rooms[roomID];
            console.log(tempArr);
            let roomINFO = currentRooms[roomID];
            if (roomINFO.numPlayers == 2) {
                // Remove the room from the main menu 
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send("x" + JSON.stringify(roomINFO));
                    }
                });
                // send message +
                ws.send('+' + JSON.stringify(roomINFO)) 
                // send to the host 
                let p2WS = webSockets[tempArr[1]];
                p2WS.send('+' + JSON.stringify(roomINFO));
            } else {
                // Not enough players :feelsbadman:
                ws.send('-')
            }
        }
    });

    ws.on("close", () => {
        delete webSockets[userID];
        if (hosting) {
            let currentRooms = roomController.getCurrentRoomsNoRes();
            let roomINFO = currentRooms[hostedRoomID];
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("x" + JSON.stringify(roomINFO));
                }
            });
            roomController.deleteRoomNoRes(hostedRoomID);
            delete rooms[hostedRoomID];
        }
        console.log("Client " + userID + " disconnected.");
    });
});

wssBattle.on("connection", ws => {
    let userID = getUniqueClientID();
    ws.id = userID;
    webSocketsBattle[userID] = ws;
    console.log("New client connected! User: " + userID);
    let teamID;
    let enemyTeamID;

    ws.on("message", data => {
        data = JSON.parse(data);
        let roomID = data.roomID;

        if (data.meta == 'connected') {
            teamID = data.teamID;
            battleRooms[teamID] = ws;
            enemyTeamID = data.enemyTeamID;
            bRoomsTurns[roomID] = [];
        } else if (data.meta == 'team-update') {
            let enemyWS = battleRooms[enemyTeamID];
            let tUpdate = {
                position: data.position,
                composerID: data.composerID
            }
            enemyWS.send('t' + JSON.stringify(tUpdate));
        } else if (data.meta == 'ready') {
            let enemyWS = battleRooms[enemyTeamID];
            enemyWS.send('opponent-ready');
        } else if (data.meta == 'atk' || data.meta == 'item' || data.meta == 'swap') {
            let arr = bRoomsTurns[roomID];
            arr.push(data);
            if (arr.length == 2) {
                let turn = JSON.stringify(battleTurn(arr));

                // send turn to both players
                let enemyWS = battleRooms[enemyTeamID];
                ws.send("m" + turn);
                enemyWS.send("m" + turn);
                bRoomsTurns[roomID] = [];
            }
        } else if (data.meta == 'quit') {
            console.log('enemy quit');
            let enemyWS = battleRooms[enemyTeamID];
            enemyWS.send('enemy-quit');
        }
    })

    ws.on("close", () => {
        teamsController.deleteTeamNoRes(teamID);
        console.log("Client " + userID + " disconnected.");
    })
});

function battleTurn(data) {
    let first = data[0];
    let second = data[1];

    let state = 0;

    let move = {}

    // check for a swap FIRST
    if (first.meta == 'swap') {
        move[state] = {
            meta: 'swap',
            player: first.player,
            swapVal: first.swap
        };
        state++;
    }
    if (second.meta == 'swap') {
        move[state] = {
            meta: 'swap',
            player: second.player,
            swapVal: second.swap
        };
        state++;
    }

    if (first.meta == 'atk') {
        let attack = first.atk;

        let damage = Math.floor(attack.Damage * (Math.random() + 0.5));

        move[state] = {
            meta: 'atk',
            player: first.player,
            current: first.current,
            attack: attack,
            damage: damage
        };
        state++;
    } else if (first.meta == 'item') {
        let healAmount = 0;
        if (first.itemID == 1) {
            healAmount = 30;
        } else if (first.itemID == 2) {
            healAmount = 100;
        }
        move[state] = {
            meta: 'item',
            player: first.player,
            current: first.current,
            healAmount: healAmount
        };
        state++;
    }

    if (second.meta == 'atk') {
        let attack = second.atk;

        let damage = Math.floor(attack.Damage * (Math.random() + 0.5));

        move[state] = {
            meta: 'atk',
            player: second.player,
            current: second.current,
            attack: attack,
            damage: damage
        };
        state++;
    } else if (second.meta == 'item') {
        let healAmount = 0;
        if (second.itemID == 1) {
            healAmount = 30;
        } else if (second.itemID == 2) {
            healAmount = 100;
        }
        move[state] = {
            meta: 'item',
            player: second.player,
            current: second.current,
            healAmount: healAmount
        };
        state++;
    }
    return move;
}

function getUniqueClientID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};