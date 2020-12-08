import { readFileSync } from 'fs'

process.chdir(require.main.path)

type FwcCallback<T, U> = (value: T, i: number) => [found: boolean, context: U]
type FwcResponse<T, U> = [value: T, context: U] | undefined

declare global {
  interface Array<T> {
    findWithContext<U>(callback: FwcCallback<T, U>): FwcResponse<T, U>
    count(callback: (value: T) => boolean): number
  }
}

Array.prototype.findWithContext = function<T, U>(callback: FwcCallback<T, U>): FwcResponse<T, U> {
  for (const [i, v] of this.map((v: T, i: number) => [i, v])) {
    const [found, context] = callback(v, i)
    if (found) {
      return [v, context]
    }
  }
}

Array.prototype.count = function<T>(callback: (value: T) => boolean): number {
  return this.filter(callback).length
}

export const inputLines = (splitWith: RegExp = /\n/) => readFileSync('input.txt').toString().split(splitWith)

export const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b)

export const within = (min: number, max: number) => (num: string | number): boolean => {
  const n = typeof num == 'number' ? num : parseInt(num, 10)
  return n != null && n >= min && n <= max
}

export const chars = (s: string) => s.replace(/\n/g, '').split('')

export const sum = (sum: number = 0, n: number) => sum + n

export const frequencies = <T>(list: T[]) =>
  list.reduce((freqs, e) => freqs.set(e, (freqs.get(e) || 0) + 1), new Map<T, number>())

export const pluck = (key: string) => (o: { [key: string]: any }) => o[key]

export const product = (vals: number[]): number => eval(vals.join('*'))