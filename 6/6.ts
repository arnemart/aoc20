import { inputLines, chars, pluck, frequencies } from '../common'

const groups = inputLines(/\n\n/)

const part1sum = groups.map(chars).map(g => new Set(g)).map(pluck('size')).sum()

console.log('Part 1:', part1sum)

const part2sum = groups.map(group => {
  const groupSize = group.split(/\n/).length
  const answers = frequencies(chars(group))
  return Array.from(answers.keys()).count(a => answers.get(a) == groupSize)
}).sum()

console.log('Part 2:', part2sum)