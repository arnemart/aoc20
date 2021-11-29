import { $, chars, count, frequencies, inputLines, intoSet, map, pipe, pluck, sum, values } from '../common'

const groups = inputLines(/\n\n/)

const part1 = pipe(map(pipe(chars, intoSet, pluck('size'))), sum)

console.log('Part 1:', $(groups, part1))

const part2: (g: string[]) => number = pipe(
  map(group => ({ answers: $(group, chars, frequencies), groupSize: group.split(/\n/).length })),
  map(({ answers, groupSize }) => $(answers, values, count(a => a == groupSize))),
  sum
)

console.log('Part 2:', $(groups, part2))