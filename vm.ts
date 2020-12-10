import { $, map, match } from './common'

interface Instruction {
  type: 'acc' | 'jmp' | 'nop',
  val: number
}

export type Program = Instruction[]

interface Machine {
  program: Program
  counter: number
  accumulator: number
  terminated: boolean
}

const insreg = /^(acc|jmp|nop) ([+-]\d+)$/

export const parseProgram = (lines: string[]): Program => $(lines, map(match(insreg)), map(matches => ({
  type: matches[1],
  val: parseInt(matches[2])
} as Instruction)))

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

export const runProgram = (program: Program, seenInstructions = new Set<number>(), machine: Machine = {
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
