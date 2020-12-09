import { inputLines } from '../common'

const seats: number[] = inputLines().map(line => parseInt(line.replace(/[FL]/g, '0').replace(/[RB]/g, '1'), 2)).sort((a, b) => b - a)

console.log('Part 1:', seats[0])

console.log('Part 2:', seats.find((seat, index) => seats[index + 1] == seat - 2) - 1)
