const { flat } = require('./functions')

const cards = [
  { '2': 2 },
  { '3': 3 },
  { '4': 4 },
  { '5': 5 },
  { '6': 6 },
  { '7': 7 },
  { '8': 8 },
  { '9': 9 },
  { '10': 10 },
  { Jack: 11 },
  { Queen: 12 },
  { King: 13 },
  { Ace: 14 }
]

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']

const deck = cards
  .map(card => {
    let number = Object.keys(card)[0]
    return suits.map(suit => {
      return { number, suit }
    })
  })
  .flat()

module.exports = { cards, suits, deck }
