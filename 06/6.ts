import { inputLines, chars, pluck, $, map, sum, frequencies, values, count, intoSet } from '../common'

const groups = inputLines(/\n\n/)

const part1sum = $(groups, map(chars), map(intoSet), map(pluck('size')), sum)

console.log('Part 1:', part1sum)

const part2sum = $(
  groups,
  map(group => ({ answers: $(group, chars, frequencies), groupSize: group.split(/\n/).length })),
  map(({ answers, groupSize }) => $(answers, values, count(a => a == groupSize))),
  sum
)

console.log('Part 2:', part2sum)