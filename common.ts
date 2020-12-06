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

export const chars = (s: string) => s.replace(/\n/g, '').split('')

export const sum = (sum: number = 0, n: number) => sum + n

export const frequencies = <Key>(list: Key[]): Map<Key, number> =>
  list.reduce((freqs, e) => freqs.set(e, (freqs.get(e) || 0) + 1), new Map())

export const pluck = (key: string) => (o: { [key: string]: any }) => o[key]