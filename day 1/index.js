const { assert } = require('console')
const fs = require('fs')

let lines = fs
  .readFileSync('input.txt')
  .toString()
  .split(/\r?\n/)
  .filter(line => line != '')

function getCalibrationValue(value) {
  const numberMap = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }

  const pattern = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/gi

  const matches = Array.from(value.matchAll(pattern)).map(match => match[1])

  const ensureNumericValue = value => (isNaN(value) ? numberMap[value] : value)

  const firstNumber = ensureNumericValue(matches.at(0))
  const lastNumber = ensureNumericValue(matches.at(-1))

  return parseInt(`${firstNumber}${lastNumber}`)
}

const total = lines.reduce(
  (currentTotal, line) => currentTotal + getCalibrationValue(line),
  0,
)

console.log(total)
