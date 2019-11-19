
import { log, app } from '../server'


var http = require('http').Server(app);
var io = require('socket.io')(http);

io.origins(['http://localhost:3001']);


export default function defaultRoute(req, res) {
    console.log('called')
    res.sendFile('index.html');
}


io.on('connection', function (socket) {
    console.log(socket)
    io.emit('this', { will: 'be received by everyone' });

    socket.on('news', function (from, msg) {
        log.info('I received a private message by ', from, ' saying ', msg);
    });


    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
});