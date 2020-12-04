import { readFileSync } from 'fs'

interface Pw {
  min: number
  max: number
  letter: string
  pw: string
}

const reg = /^(\d+)-(\d+) (\w): (\w+)$/

const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b)

const valid1 = (pw: Pw): boolean => {
  const count = pw.pw.split('').filter(letter => letter == pw.letter).length
  return count >= pw.min && count <= pw.max
}

const valid2 = (pw: Pw): boolean => {
  return xor(pw.pw.slice(pw.min - 1, pw.min) == pw.letter, pw.pw.slice(pw.max - 1, pw.max) == pw.letter)
}

const input: Pw[] = readFileSync('input.txt').toString().split(/\n/).map(line => {
  const matches = line.match(reg)
  return {
    min: parseInt(matches[1]),
    max: parseInt(matches[2]),
    letter: matches[3],
    pw: matches[4]
  }
})

console.log('Part 1:', input.filter(valid1).length)
console.log('Part 2:', input.filter(valid2).length)