import { $, filter, flatten, inputLines, join, leftPad, map, match, number, numbers, pluck, reduce, slice, sort, split, spy, spyWith, sum, values, zipWith } from '../common'

const reg = /^(mask|mem)(\[(\d+)\])? = ([0-9X]+)$/

type Mask = { type: 'mask', mask: string[] }
type Mem  = { type: 'mem', pos: number, val: number }
type Line = Mask | Mem

const input: Line[] = $(inputLines(), map(match(reg)), map(matches => {
  if (matches[1] == 'mask') {
    return {
      type: 'mask',
      mask: $(matches[4], split())
    } as Mask
  } else {
    return {
      type: 'mem',
      pos: $(matches[3], number()),
      val: $(matches[4], number())
    } as Mem
  }
}))

const zipWithMask = (mask: string[]) => (num: number): [string, string][] => $(
  num,
  n => n.toString(2),
  leftPad(36, '0'),
  split(),
  zipWith(mask),
)

const maskNumber = (num: number, mask: string[]): number => $(
  num,
  zipWithMask(mask),
  map(([s, m]) => m == 'X' ? s : m),
  join(),
  number(2)
)

type State = { currentMask: Mask, mem: { [key: number]: number }}

const sumMem = (state: State | State2): number => $(state, pluck('mem'), values, sum)

const step1 = (lines: Line[]): number => $(lines,
  slice(1),
  reduce((state, line) => (line.type == 'mask' ? {
    ...state, currentMask: line
  } as State : {
    ...state,
    mem: {
      ...state.mem,
      [line.pos]: maskNumber(line.val, state.currentMask.mask)
    }
  } as State
  ), {
    currentMask: lines[0],
    mem: {}
  } as State),
  sumMem
)

console.log('Part 1:', step1(input))


const enumerateMasks = (mask: string[]): string[][] => $(
  mask,
  reduce((masks, v, i) => {
    if (v == 'X') {
      return $(masks, map(m => [[...m, '!'], [...m, '1']]), flatten)
    } else {
      return $(masks, map(m => [...m, v]))
    }
  }, [[]])
)

const writeToMem = (mem: { [key: number]: number }, masks: string[][], pos: number, val: number) => {
  const addrs = $(masks, map(mask => $(pos, zipWithMask(mask))), map(map(([p, m]) => m == '0' ? p : (m == '!' ? '0' : '1'))), map(join()))
  return $(addrs, reduce((mem, addr) => {
    mem[addr] = val
    return mem
  }, mem))
}

type State2 = { masks: string[][], mem: { [key: number]: number }}

const step2 = (lines: Line[]): number => $(lines,
  slice(1),
  reduce((state, line) => (line.type == 'mask' ? {
    ...state, masks: enumerateMasks(line.mask),
  } as State2 : {
    ...state,
    mem: writeToMem(state.mem, state.masks, line.pos, line.val)
  } as State2
  ), {
    masks: enumerateMasks((lines[0] as Mask).mask),
    mem: {}
  } as State2),
  sumMem
)

console.log('Step 2:', step2(input))