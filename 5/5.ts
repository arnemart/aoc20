import { inputLines, chars } from '../common'

interface Seat {
  row: number
  col: number
  id: number
}

const itsSomeKindOfBinarySearch = ([first, ...rest]: boolean[], from: number = 0, to: number = Math.pow(2, rest.length + 1)) => {
  if (rest.length == 0) {
    return first ? from : to - 1
  } else {
    return first ? itsSomeKindOfBinarySearch(rest, from, to - ((to - from) / 2)) : itsSomeKindOfBinarySearch(rest, from + ((to - from) / 2), to)
  }
}

const seats: Seat[] = inputLines().map(line => chars(line).map(c => c == 'F' || c == 'L')).map(line => {
  const row = itsSomeKindOfBinarySearch(line.slice(0, 7))
  const col = itsSomeKindOfBinarySearch(line.slice(7))
  return {
    row,
    col,
    id: row * 8 + col
  } as Seat
}).sort((a, b) => b.id - a.id)

console.log('Part 1:', seats[0].id)

console.log('Part 2:', seats.find((seat, index) => seats[index + 1].id == seat.id - 2).id - 1)