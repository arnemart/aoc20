import { inputLines, $, map, filter, findWithContext } from '../common'
import { parseProgram, runProgram, Program } from '../vm'

const input = parseProgram(inputLines())

console.log('Part 1:', runProgram(input).accumulator)

const swapTypes = { 'jmp': 'nop', 'nop': 'jmp'}

const fixedPrograms: Program[] = $(
  input,
  map((ins, i) => ({ins, i})),
  filter(({ins: {type}}) => type in swapTypes),
  map(({ins, i}) => {
    const newProgram = input.slice()
    newProgram[i] = {
      ...ins,
      type: swapTypes[ins.type]
    }
    return newProgram
  })
)

const [_, machineThatTerminates] = $(fixedPrograms, findWithContext(program => {
  const m = runProgram(program)
  return [m.terminated, m]
}))

console.log('Part 2:', machineThatTerminates.accumulator)