import { inputLines, $, numbers, sortNumeric, slice, find, findWithContext, flatten, product } from '../common'

const input = $(inputLines(), numbers(), sortNumeric())

const part1numbers = $(
  input,
  findWithContext((n, i) => {
    const v = $(input, slice(i + 1), find(n2 => n + n2 == 2020))
    return [v != null, v]
  })
)

console.log('Part 1:', $(part1numbers, product))

const part2numbers = $(
  input,
  findWithContext((n, i) => {
    const v = $(input, slice(i + 1), findWithContext((n2, j) => {
      const v2 = $(input, slice(j + 1), find(n3 => n + n2 + n3 == 2020))
      return [v2 != null, v2]
    }))
    return [v != null, v]
  }),
  flatten()
)

console.log('Part 2:', $(part2numbers, product))