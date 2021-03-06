import { readFileSync } from 'fs'

process.chdir(require.main.path)

export const inputLines = (splitWith: string | RegExp = /\n/) => readFileSync('input.txt').toString().split(splitWith)

export const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b)
export const fillArray = <T>(n: number, v: T = null): T[] => Array.from(Array(n)).map(_ => v)
export const range = (n1: number, n2?: number) => n2 == undefined ? fillArray(n1).map((_, i) => i) : fillArray(n2 - n1).map((_, i) => i + n1)

export const memoize = <A, B>(fn: (v: A) => B) => {
  const memos = new Map<A, B>()
  return (v: A): B => {
    if (!memos.has(v)) {
      memos.set(v, fn(v))
    }
    return memos.get(v)
  }
}

type CF<A, B> = (a: A) => B
export function $<A>(v: A): A
export function $<A, B>(v: A, fn1: CF<A, B>): B
export function $<A, B, C>(v: A, fn1: CF<A, B>, fn2: CF<B, C>): C
export function $<A, B, C, D>(v: A, fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>): D
export function $<A, B, C, D, E>(v: A, fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>, fn4: CF<D, E>): E
export function $<A, B, C, D, E, F>(v: A, fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>, fn4: CF<D, E>, fn5: CF<E, F>): F
export function $<A, B, C, D, E, F, G>(v: A, fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>, fn4: CF<D, E>, fn5: CF<E, F>, fn6: CF<F, G>): G
export function $<A, B, C, D, E, F, G, H>(v: A, fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>, fn4: CF<D, E>, fn5: CF<E, F>, fn6: CF<F, G>, fn7: CF<G, H>): H
export function $(v: any, ...fns: CF<any, any>[]) {
  return fns.filter(fn => fn != null).reduce((v, fn) => fn(v), v)
}

export function pipe<A, B>(fn1: CF<A, B>): (v: A) => B
export function pipe<A, B, C>(fn1: CF<A, B>, fn2: CF<B, C>): (v: A) => C
export function pipe<A, B, C, D>(fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>): (v: A) => D
export function pipe<A, B, C, D, E>(fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>, fn4: CF<D, E>): (v: A) => E
export function pipe<A, B, C, D, E, F>(fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>, fn4: CF<D, E>, fn5: CF<E, F>): (v: A) => F
export function pipe<A, B, C, D, E, F, G>(fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>, fn4: CF<D, E>, fn5: CF<E, F>, fn6: CF<F, G>): (v: A) => G
export function pipe<A, B, C, D, E, F, G, H>(fn1: CF<A, B>, fn2: CF<B, C>, fn3: CF<C, D>, fn4: CF<D, E>, fn5: CF<E, F>, fn6: CF<F, G>, fn7: CF<G, H>): (v: A) => H
export function pipe<A>(...fns: CF<any, any>[]) {
  return (v: A) => fns.filter(fn => fn != null).reduce((v, fn) => fn(v), v)
}

export const map    = <T, U>(fn: (v: T, i: number, arr: T[]) => U)       => (arr: T[]): U[]     => arr.map(fn)
export const forEach   = <T>(fn: (v: T, i: number, arr: T[]) => void)    => (arr: T[]): void    => arr.forEach(fn)
export const filter    = <T>(fn: (v: T, i: number, arr: T[]) => boolean) => (arr: T[]): T[]     => arr.filter(fn)
export const some      = <T>(fn: (v: T, i: number, arr: T[]) => boolean) => (arr: T[]): boolean => arr.some(fn)
export const every     = <T>(fn: (v: T, i: number, arr: T[]) => boolean) => (arr: T[]): boolean => arr.every(fn)
export const reduce = <T, U>(fn: (agg: U, val: T, i: number, arr: T[]) => U, init: U) => (arr: T[]): U => arr.reduce(fn, init)
export const find      = <T>(fn: (v: T, i: number, arr: T[]) => boolean) => (arr: T[]): T => arr.find(fn)
export const findWithContext = <T, U>(callback: (value: T, i: number) => [found: boolean, context: U]) => (arr: T[]): [value: T, context: U] | undefined => {
  for (const {v, i} of $(arr, map((v, i) => ({v, i})))) {
    const [found, context] = callback(v, i)
    if (found) {
      return [v, context]
    }
  }
}
export const slice = <T>(start: number, end?: number) => (arr: T[]): T[] => arr.slice(start, end)
export const sum = (nums: number[]): number => nums.reduce((s, n) => s + n, 0)
export const product = (nums: number[]): number => nums.reduce((p, n) => p * n, 1)
export const zipWith = <T, U>(other: U[]) => (arr: T[]): [T, U][] => arr.map((v: T, i: number) => [v, other[i]])
export const first = <T>(arr: T[]): T => arr[0]
export const last = <T>(arr: T[]): T => arr[arr.length - 1]
export const numbers = (radix: number = 10) => (arr: string[]): number[] => arr.map(s => parseInt(s, radix))
export const number = (radix: number = 10) => (s: string): number => parseInt(s, radix)
export const length = <T>(arr: T[]): number => arr.length
export const next = <T>(i: number, amt: number = 1) => (arr: T[]): T => arr[(i + arr.length + (amt % arr.length)) % arr.length]
export const count = <T>(fn: (v: T) => boolean) => (arr: T[]) => arr.filter(fn).length
export const within = (min: number, max: number) => (num: string | number): boolean => {
  const n = typeof num == 'number' ? num : parseInt(num, 10)
  return n != null && n >= min && n <= max
}
export const chars = (s: string) => s.replace(/\n/g, '').split('')
export const pluck = <T, K extends keyof T>(key: K) => (o: T) => o[key]
export const sort = <T>(fn?: (a: T, b: T) => number) => (arr: T[]): T[] => fn ? arr.sort(fn) : arr.sort()
export const sortNumeric = ({ reverse }: { reverse: boolean } = { reverse: false }) => (arr: number[]): number[] => arr.sort((a: number, b: number) => reverse ? b - a : a - b)
export const match = (reg: RegExp) => (s: string): RegExpMatchArray => s.match(reg)
export const test = (reg: RegExp) => (s: string): boolean => reg.test(s)
export const split = (sep: RegExp | string = '') => (s: string): string[] => s.split(sep)

export function replace(fnd: RegExp | string, rep: string): (s: string) => string
export function replace(fnd: RegExp | string, rep: ((substring: string, ...args: any[]) => string)): (s: string) => string
export function replace(fnd: RegExp | string, rep: any = '') { return (s: string): string => s.replace(fnd, rep) }
export const flatten = <T, A extends Array<T>, D extends number = 1>(depth?: D) => (arr: A): FlatArray<A, D>[] => arr.flat(depth)

export const frequencies = <T>(arr: T[]): Map<T, number> => arr.reduce((freqs: Map<T, number>, e: T) => freqs.set(e, (freqs.get(e) || 0) + 1), new Map<T, number>())

export function values <K, V>(m: { [key: string]: V } | Map<K, V> | Set<V>) {
  if ((m instanceof Map || m instanceof Set)) return Array.from(m.values())
  return Object.values(m)
}

export function keys <K>(m: Map<K, any>): K[]
export function keys (m: { [key: string]: any }): string[]
export function keys (m: any): any {
  if (m instanceof Map) return Array.from(m.keys())
  return Object.keys(m)
}

export function entries <K, V>(m: Map<K, V>): [K, V][]
export function entries <V>(m: { [key: string]: V }): [string, V][]
export function entries (m: any): any {
  if (m instanceof Map) return Array.from(m.entries())
  return m.entries()
}

export const intoSet = <T>(val: T[]): Set<T> => new Set(val)
export const getIn = (...keys: (string | number)[]) => (val: any[] | { [key: string]: any }): any => keys.reduce((o, key) => o && o[key] ? o[key] : null, val)
export const cond = <T, U>(o: [T | T[], U | ((v: T) => U)][], def?: U) => (v: T): U => {
  const hit = o.find(e => e[0] instanceof Array ? e[0].some(ee => ee == v) : e[0] == v)
  if (!hit && def !== undefined) {
    return def
  } else if (!hit && def === undefined) {
    throw new Error(`Missing condition: ${v}`)
  }
  if (hit[1] instanceof Function) {
    return hit[1](v)
  } else {
    return hit[1]
  }
}
export const is = <T>(...v: T[]) => cond([[v, true]], false)
export const join = <T>(joinWith: string = '') => (arr: T[]): string => arr.join(joinWith)
export const spyWith = <T>(fn: (v: T) => any) => (v: T): T => {
  fn(v)
  return v
}
export const spy: <T>(v: T) => T = spyWith(console.log)
export const leftPad = (length: number, padWith: string) => (s: string): string => Array.from(Array(Math.max(0, length - s.length + 1))).join(padWith) + s
export const not = <T>(fn: (v: T) => boolean) => (v: T): boolean => !fn(v)
export const repeat = <T>(n: number, fn: (v: T) => T) => (v: T): T => $(range(n), reduce(v => fn(v), v))
export const add = (n: number) => (v: number): number => n + v
export const reverse = <T>(a: T[]): T[] => a.slice().reverse()
export const permute = <T>(k: number) => (a: T[]): T[][] => k > 1 ? $(a, permute(k - 1), map(l => $(a, map(n => [...l, n]))), flatten()) : $(a, map(n => [n]))