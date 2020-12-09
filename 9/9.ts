import { inputLines, sum } from '../common'

const input = inputLines().map(s => parseInt(s, 10))

const notASum = input.slice(25).find((num, i) => {
  const prev25 = input.slice(i, i + 25)
  return !prev25.find((n, i) => prev25.slice(i + 1).find(n2 => n + n2 == num))
})

console.log('Part 1:', notASum)

const findRange = (i: number, sumToFind: number, length = 1): number[] => {
  const range = input.slice(i, i + length)
  const rsum = range.reduce(sum)
  if (rsum < sumToFind) {
    return findRange(i, sumToFind, length + 1)
  } else if (rsum == sumToFind) {
    return range
  }
  return []
}

const [_, rangeThatSums] = input.findWithContext((_, i) => {
  const range = findRange(i, notASum)
  return [range.length > 0, range]
})

console.log('Part 2:', Math.min(...rangeThatSums) + Math.max(...rangeThatSums))