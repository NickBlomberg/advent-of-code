const fs = require('fs')
const path = require('path')

function parseGameInput() {
  const lines = fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .split(/\r?\n/)
    .filter(line => line != '')

  const cards = lines
    .map(line => line.match(/^Card +(\d)+:\s+(.*?) \| ([\d\s]*)/))
    .map(match => {
      return {
        cardId: match[1],
        winningNumbers: match[2].split(' ').filter(n => n !== ''),
        numbers: match[3].split(' ').filter(n => n !== ''),
      }
    })

  return cards
}

function calculateScores(cards) {
  return cards.map(card => {
    const wins = card.numbers.filter(n => card.winningNumbers.includes(n))
    const score = wins.length ? Math.pow(2, wins.length - 1) : 0

    return { ...card, score }
  })
}

function part1() {
  const cards = parseGameInput()
  const scoredCards = calculateScores(cards)

  const totalPoints = scoredCards.reduce((total, { score }) => {
    return (total += score)
  }, 0)

  return totalPoints
}

part1()

module.exports = part1
