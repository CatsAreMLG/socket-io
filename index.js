const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.use('/static', express.static('static'))

let num = 0

io.on('connection', function(socket) {
  console.log('a user connected')
  socket.on('disconnect', function() {
    console.log('user disconnected')
  })
  socket.on('increment', function() {
    num += 1
    io.emit('increment', num)
  })
  socket.on('decrement', function() {
    num -= 1
    io.emit('decrement', num)
  })
})

http.listen(3000, function() {
  console.log('listening on http://localhost:3000/')
})
