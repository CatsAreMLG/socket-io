var socket = io()
const number = document.querySelector('#number')
document.querySelector('#start').addEventListener('click', e => {
  e.preventDefault()
  socket.emit('start')
})
socket.on('start', function(deck) {
  console.log(deck)
  document.querySelector('.deck').innerText = ''
  deck.map(card => {
    let div = document.createElement('div')
    div.classList.add(
      card.suit == 'Diamonds' || card.suit == 'Hearts' ? 'red' : 'black'
    )
    div.innerText = `${card.number} of ${card.suit}`
    document.querySelector('.deck').appendChild(div)
  })
})
