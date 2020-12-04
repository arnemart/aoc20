import { readFileSync } from 'fs'

const input = readFileSync('input.txt').toString().split(/\n/).map(line => line.split('').map(c => c == '#'))

const checkSlope = (right: number, down: number) => input.reduce((state, line, y) => ({
  count: state.count + (line[state.x] && y % down == 0 ? 1 : 0),
  x: (state.x + (y % down == 0 ? right : 0)) % line.length
}), {
  count: 0,
  x: 0
}).count

console.log('Part 1:', checkSlope(3, 1))

console.log('Part 2:', checkSlope(1, 1) * checkSlope(3, 1) * checkSlope(5, 1) * checkSlope(7, 1) * checkSlope(1, 2))