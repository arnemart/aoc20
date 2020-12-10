import { inputLines, $, map, pipe, replace, numbers, sortNumeric } from '../common'

const seats: number[] = $(
  inputLines(),
  map(pipe(replace(/[FL]/g, '0'), replace(/[RB]/g, '1'))),
  numbers(2),
  sortNumeric({ reverse: true })
)

console.log('Part 1:', seats[0])

console.log('Part 2:', seats.find((seat, index) => seats[index + 1] == seat - 2) - 1)
