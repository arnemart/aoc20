import { $, cond, flatten, inputLines, join, leftPad, map, match, number, pluck, reduce, slice, split, sum, values, zipWith } from '../common'

const reg = /^(mask|mem)(\[(\d+)\])? = ([0-9X]+)$/

type MaskCmd = { type: 'mask', mask: string[] }
type MemCmd  = { type: 'mem', pos: number, val: number }
type Cmd = MaskCmd | MemCmd

const input: Cmd[] = $(inputLines(), map(match(reg)), map(matches => {
  if (matches[1] == 'mask') {
    return {
      type: 'mask',
      mask: $(matches[4], split())
    } as MaskCmd
  } else {
    return {
      type: 'mem',
      pos: $(matches[3], number()),
      val: $(matches[4], number())
    } as MemCmd
  }
}))

const zipWithMask = (mask: string[]) => (num: number): [string, string][] => $(num,
  n => n.toString(2),
  leftPad(36, '0'),
  split(),
  zipWith(mask),
)

const maskNumber = (num: number, mask: string[]): number => $(num,
  zipWithMask(mask),
  map(([s, m]) => m == 'X' ? s : m),
  join(),
  number(2)
)

type Mem = { [key: number]: number }
type State = { currentMask: MaskCmd, mem: Mem }

const sumMem = (state: State | State2): number => $(state, pluck('mem'), values, sum)

const step1 = (lines: Cmd[]): number => $(lines,
  slice(1),
  reduce((state, line) => (line.type == 'mask' ? {
    ...state, currentMask: line
   } : {
    ...state,
    mem: {
      ...state.mem,
      [line.pos]: maskNumber(line.val, state.currentMask.mask)
    }
  }), {
    currentMask: lines[0],
    mem: {}
  } as State),
  sumMem
)

console.log('Part 1:', step1(input))


const enumerateMasks = (mask: string[]): string[][] => $(mask,
  reduce((masks, v, i) => v == 'X' ? $(masks,
    map(m => [[...m, 'X'], [...m, '1']]),
    flatten
  ) : $(masks,
    map(m => [...m, v])
  ), [[]])
)

const writeToMem = (mem: Mem, masks: string[][], pos: number, val: number): Mem => $(masks,
  map(mask => $(pos, zipWithMask(mask))),
  map(map(([p, m]) => cond([['0', p], ['X', '0']], '1')(m))),
  map(join()),
  reduce((mem, addr) => {
    mem[addr] = val
    return mem
  }, mem)
)

type State2 = { masks: string[][], mem: Mem }

const step2 = (lines: Cmd[]): number => $(lines,
  slice(1),
  reduce((state, line) => (line.type == 'mask' ?
    { ...state, masks: enumerateMasks(line.mask) } :
    { ...state, mem: writeToMem(state.mem, state.masks, line.pos, line.val) }
  ), {
    masks: enumerateMasks((lines[0] as MaskCmd).mask),
    mem: {}
  } as State2),
  sumMem
)

console.log('Step 2:', step2(input))