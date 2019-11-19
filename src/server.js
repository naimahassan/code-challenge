const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const readline = require('readline')
const fs = require('fs')
var lineReader = require('line-reader')

// our localhost port
const port = 3001

const app = express()

// our server instance
const server = http.createServer(app)


app.use('/', express.static(path.join(__dirname, 'public')))


app.get('/', function (req, res) {
    res.sendFile('index.html');
});


// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', (socket) => {

    console.log('user connected');


    const data = fs.readFileSync('./src/206F4C.json', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    var counter = 1;


    function* loopArray(lines) {
        yield socket.emit('news', { 'data': lines[counter++] });




    }


    setInterval((dataGen = loopArray(lines)) => {
        dataGen.next().value
    }, 3000);

    socket.on('news', (data) => {
        console.log(data)

    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})




server.listen(port, () => console.log(`Listening on port ${port}`))