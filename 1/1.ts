import { inputLines } from '../common'

const input = inputLines().map(line => parseInt(line, 10))

const part1 = input.reduce((answer, n, index) => answer || input.slice(index + 1).find(n2 => n + n2 == 2020) * n || 0, 0)
console.log('Part 1:', part1)

const part2 = input.reduce((answer, n, index) => answer || input.slice(index + 1).reduce((answer2, n2, index2) => answer2 || input.slice(index2).find(n3 => n3 + n2 + n == 2020) * n2 * n || 0, 0) || 0, 0)
console.log('Part 2:', part2)
