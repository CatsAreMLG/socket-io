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
let newDeck = [...deck]

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
    newDeck = [...deck]
    newDeck.shuffle()
    io.emit('start', newDeck)
    const player = players.find(user => user.id === this.id)
    player.hand = []
  })
  socket.on('draw', function() {
    if (newDeck.length > 0) {
      const player = players.find(user => user.id === this.id)
      player.hand.push(newDeck.pop())
      io.to(this.id).emit('draw', player.hand)
      io.emit('refresh', newDeck)
      if (newDeck.length > 0) {
        io.emit('out', true)
      }
    }
  })
})

http.listen(3000, function() {
  console.log('listening on http://localhost:3000/')
})
