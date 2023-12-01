const fs = require('fs')

let lines = fs
  .readFileSync('input.txt')
  .toString()
  .split(/\r?\n/)
  .filter(line => line != '')

function getCalibrationValue(value) {
  let firstNumber = undefined
  let lastNumber = undefined

  Array.from(value).forEach(char => {
    const isDigit = /^\d+$/.test(char)

    if (isDigit) {
      if (!firstNumber) firstNumber = char
      lastNumber = char
    }
  })

  return parseInt(`${firstNumber}${lastNumber}`)
}

const total = lines.reduce(
  (currentTotal, line) => currentTotal + getCalibrationValue(line),
  0,
)

console.log(total)
