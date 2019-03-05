var socket = io()
const number = document.querySelector('#number')
document.querySelector('#plus').addEventListener('click', e => {
  e.preventDefault()
  socket.emit('increment')
})
document.querySelector('#minus').addEventListener('click', e => {
  e.preventDefault()
  socket.emit('decrement')
})
socket.on('increment', function(num) {
  number.innerText = num
})
socket.on('decrement', function(num) {
  number.innerText = num
})
