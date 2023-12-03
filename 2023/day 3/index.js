const fs = require('fs')
const path = require('path')

const isNumber = x => /\d/.test(x)
const isValidPosition = (schematic, row, col) => {
  return (
    row >= 0 &&
    row < schematic.rowLength &&
    col >= 0 &&
    col < schematic.colLength
  )
}

function readEngineSchematic() {
  const engineSchematic = fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .split(/\r?\n/)
    .filter(line => line != '')
    .map(line => Array.from([...line]))

  const rowLength = engineSchematic.length
  const colLength = engineSchematic[0].length

  return { engineSchematic, colLength, rowLength }
}

function getPossibleEngineParts({ engineSchematic, colLength, rowLength }) {
  let possibleEngineParts = []
  // Rows
  for (let row = 0; row < rowLength; row++) {
    // Cols
    let isPrevCharNumber = false
    let number = []
    let coords = []

    for (let col = 0; col < colLength; col++) {
      const currentChar = engineSchematic[row][col]

      const isEndOfRow = col === colLength - 1

      if (isNumber(currentChar)) {
        isPrevCharNumber = true
        number.push(currentChar)
        coords.push(new Array(row, col))

        if (!isEndOfRow) continue
      }

      // The current character is not numeric,
      // If the previous character was a number, we have reached the end of a
      // potential enfine part number, so we can add this to an array
      // Include an array of the coords so we can check this for surrounding
      // symbols later
      if (isPrevCharNumber) {
        possibleEngineParts.push({
          number: parseInt(number.join('')),
          coords: coords,
        })
      }

      number = []
      coords = []
      isPrevCharNumber = false
    }
  }
  return possibleEngineParts
}

function filterEngineParts(schematic, possibleEngineParts) {
  let engineParts = []

  for (let { number, coords } of possibleEngineParts) {
    coords.every(coord => {
      const [row, col] = coord

      const topCoords = [row - 1, col]
      const bottomCoords = [row + 1, col]
      const leftCoords = [row, col - 1]
      const rightCoords = [row, col + 1]
      const topLeftCoords = [row - 1, col - 1]
      const topRightCoords = [row + 1, col - 1]
      const bottomLeftCoords = [row - 1, col + 1]
      const bottomRightCoords = [row + 1, col + 1]

      const adjacentCells = [
        topCoords,
        bottomCoords,
        leftCoords,
        rightCoords,
        topLeftCoords,
        topRightCoords,
        bottomLeftCoords,
        bottomRightCoords,
      ]

      const symbols = ['&', '+', '-', '#', '@', '$', '*', '/', '%', '=']

      for (let i = 0; i < adjacentCells.length; i++) {
        const [row, col] = adjacentCells[i]

        if (!isValidPosition(schematic, row, col)) continue
        const cellContent = schematic.engineSchematic[row][col]

        if (symbols.includes(cellContent)) {
          engineParts.push(number)
          return false
        }
      }

      return true
    })
  }

  return engineParts
}

function part1() {
  const schematic = readEngineSchematic()
  const possibleEngineParts = getPossibleEngineParts(schematic)
  const engineParts = filterEngineParts(schematic, possibleEngineParts)

  const total = engineParts.reduce((sum, num) => sum + num)

  console.log({
    schematic,
    engineParts,
    total,
  })

  return total
}

part1()

module.exports = part1
