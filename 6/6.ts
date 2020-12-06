import { inputLines, sum, pluck } from '../common'

const groups = inputLines(/\n\n/)

const part1sum = groups.map(group => new Set(group.replace(/\n/g, '').split(''))).map(pluck('size')).reduce(sum)

console.log('Part 1:', part1sum)

interface Answers {
  [key: string]: number
}

const part2sum = groups.map(group => {
  const groupSize = group.split(/\n/).length
  const answers = group.replace(/\n/g, '').split('').reduce((as, a) => ({
    ...as,
    [a]: (as[a] || 0) + 1
  }), {}) as Answers
  return Object.keys(answers).map(a => answers[a] == groupSize ? 1 : 0).reduce(sum, 0)
}).reduce(sum)

console.log('Part 2:', part2sum)