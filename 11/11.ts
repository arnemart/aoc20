import { $, inputLines, map, reduce, split, getIn, cond, join, flatten, length, filter, count } from '../common'

type Seat = ('L' | '#' | '.')
type SeatMap = Seat[][]

const seatMap = $(inputLines(), map(split())) as SeatMap

const dirs = [
  [-1, -1], [0, -1], [1, -1],
  [-1,  0],          [1,  0],
  [-1,  1], [0,  1], [1,  1]
]

const adjOcc1 = (seats: SeatMap, x: number, y: number): number => $(
  dirs,
  map(([dx, dy]) => $(seats, getIn(y + dy, x + dx))),
  count(s => s == '#')
)

const findInDirection = (seats: SeatMap, x: number, y: number, [dx, dy]: number[]): boolean => $(
  seats,
  getIn(y + dy, x + dx),
  cond([
    [[null, 'L'], false],
    ['#', true],
    ['.', () => findInDirection(seats, x + dx, y + dy, [dx, dy])]
  ])
)

const adjOcc2 = (seats: SeatMap, x: number, y: number): number => $(
  dirs,
  map(d => findInDirection(seats, x, y, d)),
  count(s => s)
)

const step = (n: number, afn: (seats: SeatMap, x: number, y: number) => number) => (seats: SeatMap): SeatMap => $(
  seats,
  map((row, y) => $(row,
    map((seat, x) => $(
      seat,
      cond([
        ['.', '.'],
        ['L', afn(seats, x, y) == 0 ? '#' : 'L'],
        ['#', afn(seats, x, y) >= n ? 'L' : '#']
      ])
    ) as Seat))
  )
)

const equal = (s1: SeatMap, s2: SeatMap) => $(s1, map(join()), join()) == $(s2, map(join()), join())

const stepUntilEqual = (st: (s: SeatMap) => SeatMap) => (seats: SeatMap): SeatMap => {
  const newSeats = st(seats)
  if (equal(seats, newSeats)) {
    return seats
  } else {
    return stepUntilEqual(st)(newSeats)
  }
}

const countOccupied = (seats: SeatMap): number => $(
  seats,
  flatten,
  filter(s => s == '#'),
  length
)

const step1 = step(4, adjOcc1)
const step2 = step(5, adjOcc2)

console.log('Part 1:', $(seatMap, stepUntilEqual(step1), countOccupied))
console.log('Part 2:', $(seatMap, stepUntilEqual(step2), countOccupied))