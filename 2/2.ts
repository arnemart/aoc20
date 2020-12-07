import { inputLines, xor, within, chars } from '../common'

interface Pw {
  min: number
  max: number
  letter: string
  pw: string
}

const reg = /^(\d+)-(\d+) (\w): (\w+)$/

const valid1 = ({pw, min, max, letter}: Pw) => within(min, max)(chars(pw).filter(l => l == letter).length)

const valid2 = ({pw, min, max, letter}: Pw) => xor(pw.charAt(min - 1) == letter, pw.charAt(max - 1) == letter)

const input: Pw[] = inputLines().map(line => line.match(reg)).map(matches => ({
  min: parseInt(matches[1]),
  max: parseInt(matches[2]),
  letter: matches[3],
  pw: matches[4]
}))

console.log('Part 1:', input.filter(valid1).length)
console.log('Part 2:', input.filter(valid2).length)