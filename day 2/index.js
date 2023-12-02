const fs = require('fs')

const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14

const colorMap = {
  red: MAX_RED,
  green: MAX_GREEN,
  blue: MAX_BLUE,
}

let lines = fs
  .readFileSync('input.txt')
  .toString()
  .split(/\r?\n/)
  .filter(line => line != '')

let validGames = []
lines.forEach(line => {
  const gameId = Number(line.match(/^Game (\d+)/i)[1])

  const sets = line
    .split(':')[1]
    .split(';')
    .map(set => set.trim())

  const isValidGame = sets.reduce((isValid, set) => {
    const setParts = set.split(',').map(part => part.trim())

    for (let i = 0; i < setParts.length; i++) {
      const regex = /^(\d+) (red|blue|green)$/

      const [, count, color] = setParts[i].match(regex)

      if (count > colorMap[color]) return false
    }

    return isValid
  }, true)

  if (isValidGame) validGames.push(gameId)
})

const sumOfValidGames = validGames.reduce((sum, gameId) => sum + gameId)

console.log({ validGames, sumOfValidGames })
