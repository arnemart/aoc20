import { $, inputLines, map, sum, numbers, pipe } from '../common'

const input = inputLines()

const parenReg = /\(([^()]+)\)/g
const calcReg = /^\d+\s*(\+|\*)\s*\d+/
const plusReg = /\d+\s*\+\s*\d+/

const calculateFromLeft = (line: string): string => calcReg.test(line) ?
  calculateFromLeft(line.replace(calcReg, eval)) :
  line

const replaceParens = (calcFn: (s: string) => string) => (line: string): string => parenReg.test(line) ?
  replaceParens(calcFn)(line.replace(parenReg, (_, match) => calcFn(match))) :
  calcFn(line)

console.log('Part 1:', $(input, map(replaceParens(calculateFromLeft)), numbers(), sum))

const calculatePlusFirst = (line: string): string => plusReg.test(line) ?
  calculatePlusFirst(line.replace(plusReg, eval)) :
  line

console.log('Part 2:', $(input, map(replaceParens(pipe(calculatePlusFirst, calculateFromLeft))), numbers(), sum))