import { inputLines } from '../common'

const groups = inputLines(/\n\n/)

const part1sum = groups.map(group => new Set(group.replace(/\n/g, '').split(''))).reduce((sum, group) => sum + group.size, 0)

console.log('Part 1:', part1sum)

const part2sum = groups.map(group => {
  const groupSize = group.split(/\n/).length
  const answers = group.replace(/\n/g, '').split('').reduce((as, a) => ({
    ...as,
    [a]: (as[a] || 0) + 1
  }), {})
  return Object.keys(answers).reduce((sum, answer) => sum + (answers[answer] == groupSize ? 1 : 0), 0)
}).reduce((sum, n) => sum + n, 0)

console.log('Part 2:', part2sum)