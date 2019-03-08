const flat = Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth - 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      )
    }, [])
  },
  writable: false
})
const shuffleMethod = array => {
  if (Array.isArray(array)) {
    const length = array.length
    for (let i = 0; i < length; i++) {
      const set = Math.floor(Math.random() * length)
      const temp = array[set]
      array[set] = array[i]
      array[i] = temp
    }
  }
  return array
}
const shuffle = Object.defineProperty(Array.prototype, 'shuffle', {
  value: function() {
    return shuffleMethod(this)
  },
  writable: false
})

module.exports = { flat, shuffle }
