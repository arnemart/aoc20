import { inputLines, product } from '../common'

const input = inputLines().map(line => parseInt(line, 10)).sort((a, b) => a - b)

const part1numbers = input.findWithContext((n, i) => {
  const v = input.slice(i + 1).find(n2 => n + n2 == 2020)
  return [v != null, v]
})

console.log('Part 1:', product(part1numbers))

const part2numbers = input.findWithContext((n, i) => {
  const v = input.slice(i + 1).findWithContext((n2, j) => {
    const v2 = input.slice(j + 1).find(n3 => n + n2 + n3 == 2020)
    return [v2 != null, v2]
  })
  return [v != null, v]
}).flat()

console.log('Part 2:', product(part2numbers))