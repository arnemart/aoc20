import { $, inputLines, join, numbers, product, range, repeat, slice } from '../common'

type LL = {
  car: number
  cdr: LL
}

const _index: LL[] = []

const buildLL = ([v, ...vs]: number[], first?: LL): LL => {
  const start: LL = {
    car: v,
    cdr: null
  }
  _index[v] = start
  let current = start
  for (const i of range(vs.length)) {
    const tmp: LL = {
      car: vs[i],
      cdr: null
    }
    current.cdr = tmp
    current = tmp
    _index[vs[i]] = tmp
  }
  current.cdr = first || start
  return start
}

const findLL = (v: number) => (): LL => _index[v]

const takeLL = (n: number) => (l: LL): number[] => n == 1 ? [l.car] : [l.car, ...$(l.cdr, takeLL(n - 1))]

const destination = (n: number, andNot: number[], max: number) => {
  const next = n > 1 ? n - 1 : max
  return andNot.includes(next) ? destination(next, andNot, max) : next
}

const step = (l: LL, max = 9): LL => {
  const threeNext = $(l.cdr, takeLL(3))
  l.cdr = l.cdr.cdr.cdr.cdr
  const dest = $(l, findLL(destination(l.car, threeNext, max)))
  const threeNew = buildLL(threeNext, dest.cdr)
  dest.cdr = threeNew
  return l.cdr
}

const input = $(inputLines(''), numbers(10))

console.log('Part 1:', $(input, buildLL, repeat(100, step), findLL(1), takeLL(9), slice(1), join('')))

const input2 = [...input, ...range(10, 1000001)]

console.log('Part 2:', $(input2, buildLL, ll => {
  for (const _ of range(10000000)) {
    ll = step(ll, 1000000)
  }
  return ll
}, findLL(1), takeLL(3), slice(1), product))
