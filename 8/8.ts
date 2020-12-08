import { inputLines } from '../common'

interface Instruction {
  type: 'acc' | 'jmp' | 'nop',
  val: number
}

type Program = Instruction[]

interface Machine {
  program: Program
  counter: number
  accumulator: number
  terminated: boolean
}

const insreg = /^(acc|jmp|nop) ([+-]\d+)$/

const input: Program = inputLines().map(line => line.match(insreg)).map(matches => ({
  type: matches[1],
  val: parseInt(matches[2])
} as Instruction))

const step = (m: Machine): Machine => {
  if (m.counter == m.program.length) {
    return { ...m, terminated: true }
  }

  const ins = m.program[m.counter]
  switch(ins.type) {
    case 'acc': return {
      ...m,
      counter: m.counter + 1,
      accumulator: m.accumulator + ins.val
    }
    case 'jmp': return {
      ...m,
      counter: m.counter + ins.val
    }
    default: return {
      ...m,
      counter: m.counter + 1
    }
  }
}

const runProgram = (program: Program, seenInstructions = new Set<number>(), machine: Machine = {
  program: program,
  counter: 0,
  accumulator: 0,
  terminated: false
}): Machine => {
  const m = step(machine)
  if (m.terminated || seenInstructions.has(m.counter)) {
    return m
  } else {
    return runProgram(program, seenInstructions.add(m.counter), m)
  }
}

console.log('Part 1:', runProgram(input).accumulator)

const fixedPrograms: Program[] = input
.map((ins, i) => ({ins, i}))
.filter(({ins: {type}}) => type == 'jmp' || type == 'nop')
.map(({ins, i}) => {
  const newProgram = input.slice()
  newProgram[i] = {
    ...ins,
    type: (ins.type == 'jmp' ? 'nop' : 'jmp')
  }
  return newProgram
})

const [_, machineThatTerminates] = fixedPrograms.findWithContext(program => {
  const m = runProgram(program)
  return [m.terminated, m]
})

console.log('Part 2:', machineThatTerminates.accumulator)