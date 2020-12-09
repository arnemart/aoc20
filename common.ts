import { readFileSync } from 'fs'

process.chdir(require.main.path)

type FwcCallback<T, U> = (value: T, i: number) => [found: boolean, context: U]
type FwcResponse<T, U> = [value: T, context: U] | undefined

declare global {
  interface Array<T> {
    findWithContext<U>(callback: FwcCallback<T, U>): FwcResponse<T, U>
    count(callback: (value: T) => boolean): number
    frequencies(): Map<T, number>
    numbers(radix?: number): number[]
    sortNumeric(options?: { reverse: boolean }): T[]
    sum(): number
    product(): number
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

Array.prototype.frequencies = function<T>(): Map<T, number> {
  return this.reduce((freqs: Map<T, number>, e: T) => freqs.set(e, (freqs.get(e) || 0) + 1), new Map<T, number>())
}

Array.prototype.numbers = function(radix: number = 10): number[] {
  return this.map((s: any) => parseInt(s, radix))
}

Array.prototype.sortNumeric = function({ reverse }: { reverse: boolean } = { reverse: false }): number[] {
  return this.sort((a: number, b: number) => reverse ? b - a : a - b)
}

Array.prototype.sum = function(): number {
  return this.reduce((s: number, n: number) => s + n, 0)
}

Array.prototype.product = function(): number {
  return this.reduce((p: number, n: number) => p * n, 1)
}

export const inputLines = (splitWith: RegExp = /\n/) => readFileSync('input.txt').toString().split(splitWith)

export const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b)

export const within = (min: number, max: number) => (num: string | number): boolean => {
  const n = typeof num == 'number' ? num : parseInt(num, 10)
  return n != null && n >= min && n <= max
}

export const chars = (s: string) => s.replace(/\n/g, '').split('')

export const pluck = (key: string) => (o: { [key: string]: any }) => o[key]
