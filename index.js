const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
let { deck } = require('./static/js/cards')
const { shuffle } = require('./static/js/functions')

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.use('/static', express.static('static'))

let num = 0
let players = []

io.on('connection', function(socket) {
  players.push({ id: socket.id, hand: [] })
  console.log('a user connected')
  socket.on('disconnect', function() {
    players = players.filter(player => {
      player.id !== this.id
    })
    console.log('user disconnected')
  })
  socket.on('start', function() {
    io.emit('start', deck.shuffle())
  })
  socket.on('draw', function() {
    const player = players.find(user => user.id === this.id)
    player.hand.push(deck.pop())
    io.emit('draw', player.hand)
    io.emit('refresh', deck)
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
