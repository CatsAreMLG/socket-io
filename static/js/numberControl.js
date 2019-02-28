var socket = io()
document.querySelector('#plus').addEventListener('click', e => {
  e.preventDefault()
  socket.emit('increment')
})
document.querySelector('#minus').addEventListener('click', e => {
  e.preventDefault()
  socket.emit('decrement')
})
socket.on('increment', function(num) {
  document.querySelector('#number').innerText = num
})
socket.on('decrement', function(num) {
  document.querySelector('#number').innerText = num
})
