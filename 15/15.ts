import { $, inputLines, last, map, numbers, pluck, reduce } from '../common'

const input = $(inputLines(/,/), numbers())

type InputMap = Map<number, number[]>
const setNum = (m: InputMap, pos: number, val: number) => m.set(pos, (m.has(pos) ? [val + 1, m.get(pos)[0]] : [val + 1]))

const getFinalNumber = (nth: number, input: number[]) => $(
  Array.from(Array(nth - input.length)),
  map((_, i) => i + input.length),
  reduce(({ mp, num: prev }, turn) => {
    const prevPos = mp.get(prev)
    const num = prevPos.length == 1 ? 0 : prevPos[0] - prevPos[1]
    return { mp: setNum(mp, num, turn), num }
  }, { mp: $(input, reduce(setNum, new Map() as InputMap)), num: $(input, last) }),
  pluck('num')
)

console.log('Part 1:', getFinalNumber(2020, input))
console.log('Part 2:', getFinalNumber(30000000, input))