import { inputLines, xor, within, chars } from '../common'

interface Pw {
  min: number
  max: number
  letter: string
  pw: string
}

const reg = /^(\d+)-(\d+) (\w): (\w+)$/

const valid1 = (pw: Pw) => within(pw.min, pw.max)(chars(pw.pw).filter(l => l == pw.letter).length)

const valid2 = (pw: Pw) => xor(pw.pw.slice(pw.min - 1, pw.min) == pw.letter, pw.pw.slice(pw.max - 1, pw.max) == pw.letter)

const input: Pw[] = inputLines().map(line => line.match(reg)).map(matches => ({
  min: parseInt(matches[1]),
  max: parseInt(matches[2]),
  letter: matches[3],
  pw: matches[4]
}))

console.log('Part 1:', input.filter(valid1).length)
console.log('Part 2:', input.filter(valid2).length)