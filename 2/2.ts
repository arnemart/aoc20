import { inputLines, xor, within, chars } from '../common'

interface Pw {
  min: number
  max: number
  letter: string
  pw: string
}

const pwreg = /^(\d+)-(\d+) (\w): (\w+)$/

const valid1 = ({pw, min, max, letter}: Pw) => within(min, max)(chars(pw).count(l => l == letter))

const valid2 = ({pw, min, max, letter}: Pw) => xor(pw.charAt(min - 1) == letter, pw.charAt(max - 1) == letter)

const input: Pw[] = inputLines().map(l => l.match(pwreg)).map(([_, min, max, letter, pw]) => ({
  min: parseInt(min),
  max: parseInt(max),
  letter,
  pw
}))

console.log('Part 1:', input.count(valid1))
console.log('Part 2:', input.count(valid2))