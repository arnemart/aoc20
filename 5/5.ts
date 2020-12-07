import { inputLines } from '../common'

interface Seat {
  row: number
  col: number
  id: number
}

const seats: Seat[] = inputLines().map(line => line.replace(/[FL]/g, '0').replace(/[RB]/g, '1')).map(line => {
  const row = parseInt(line.slice(0, 7), 2)
  const col = parseInt(line.slice(7), 2)
  return {
    row,
    col,
    id: row * 8 + col
  } as Seat
}).sort((a, b) => b.id - a.id)

console.log('Part 1:', seats[0].id)

console.log('Part 2:', seats.find((seat, index) => seats[index + 1].id == seat.id - 2).id - 1)
