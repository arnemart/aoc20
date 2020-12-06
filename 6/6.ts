import { inputLines, chars, sum, pluck, frequencies } from '../common'

const groups = inputLines(/\n\n/)

const part1sum = groups.map(chars).map(g => new Set(g)).map(pluck('size')).reduce(sum)

console.log('Part 1:', part1sum)

const part2sum = groups.map(group => {
  const groupSize = group.split(/\n/).length
  const answers = frequencies(chars(group))
  return Array.from(answers.keys()).map(a => answers.get(a) == groupSize ? 1 : 0).reduce(sum, 0)
}).reduce(sum)

console.log('Part 2:', part2sum)