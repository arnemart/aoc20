import { readFileSync } from 'fs'

export const inputLines = (splitWith: RegExp = /\n/) => readFileSync('input.txt').toString().split(splitWith)

export const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b)

export const within = (min: number, max: number) => (num: string | number): boolean => {
  const n = typeof num == 'number' ? num : parseInt(num, 10)
  return n != null && n >= min && n <= max
}