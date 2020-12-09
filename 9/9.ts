import { inputLines } from '../common'

const input = inputLines().numbers()

const findNotASum = (list: number[], preamble: number): number => list.slice(preamble).find((num, i) => {
  const prev25 = list.slice(i, i + preamble)
  return !prev25.find((n, i) => prev25.slice(i + 1).find(n2 => n + n2 == num))
})

const findRange = (list: number[], i: number, sumToFind: number, length = 1): number[] => {
  const range = list.slice(i, i + length)
  const rsum = range.sum()
  if (rsum < sumToFind) {
    return findRange(list, i, sumToFind, length + 1)
  } else if (rsum == sumToFind) {
    return range
  }
  return []
}

const findRangeThatSums = (list: number[], itShouldSumTo: number): number[] => list.findWithContext((_, i) => {
  const range = findRange(input, i, itShouldSumTo)
  return [range.length > 0, range]
})[1]

const notASum = findNotASum(input, 25)

console.log('Part 1:', notASum)

const rangeThatSums = findRangeThatSums(input, notASum)

console.log('Part 2:', Math.min(...rangeThatSums) + Math.max(...rangeThatSums))