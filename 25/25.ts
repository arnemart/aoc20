import { $, inputLines, numbers, range, reduce } from '../common'

const [pk1, pk2] = $(inputLines(), numbers(10))

const findLoops = (n: number): number => {
  let i = 0
  let s = 1
  for (; s != n; i++) {
    s = (s * 7) % 20201227
  }
  return i
}

const loop = (s: number) => (n: number): number => $(range(n), reduce(t => (t * s) % 20201227, 1))

console.log('Part 1:', $(pk1, findLoops, loop(pk2)))