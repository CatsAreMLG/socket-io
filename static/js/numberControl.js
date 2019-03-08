var socket = io()
const number = document.querySelector('#number')
document.querySelector('#start').addEventListener('click', e => {
  e.preventDefault()
  socket.emit('start')
})
const drawDiv = _ => {
  let draw = document.createElement('button')
  draw.id = 'draw'
  draw.innerText = 'DRAW'
  draw.addEventListener('click', e => {
    e.preventDefault()
    socket.emit('draw')
  })
  return draw
}
socket.on('start', function(deck) {
  console.log(deck)
  document.querySelector('.deck').innerText = ''
  const draw = drawDiv()
  deck.map(card => {
    let div = document.createElement('div')
    document.querySelector('.button_container').appendChild(draw)
    div.classList.add(
      card.suit == 'Diamonds' || card.suit == 'Hearts' ? 'red' : 'black'
    )
    div.innerText = `${card.number} of ${card.suit}`
    document.querySelector('.deck').appendChild(div)
  })
})
socket.on('draw', function(hand) {
  console.log(hand)
})
