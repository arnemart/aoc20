import { readFileSync } from 'fs'

process.chdir(require.main.path)

export const inputLines = (splitWith: RegExp = /\n/) => readFileSync('input.txt').toString().split(splitWith)

export const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b)

export const within = (min: number, max: number) => (num: string | number): boolean => {
  const n = typeof num == 'number' ? num : parseInt(num, 10)
  return n != null && n >= min && n <= max
}

export const returnAndLog = (ret: any = true) => (...args: any[]) => {
  if (ret) {
    console.log(...args)
  }
  return ret
}