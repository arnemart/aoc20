import { $, inputLines, last, map, numbers, pluck, range, reduce, slice } from '../common'

const input = $(inputLines(/,/), numbers())

const getFinalNumber = (nth: number, input: number[]) => $(
  range(input.length, nth),
  reduce(({ mp, num: prev }, turn) => ({
    num: (mp.has(prev) ? turn - mp.get(prev) : 0),
    mp: mp.set(prev, turn)
  }), {
    num: $(input, last),
    mp: $(input, slice(0, -1), reduce((m, p, n) => m.set(p, n + 1), new Map<number, number>()))
  }),
  pluck('num')
)

console.log('Part 1:', getFinalNumber(2020, input))
console.log('Part 2:', getFinalNumber(30000000, input))