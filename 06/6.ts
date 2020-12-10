import { inputLines, chars, pluck } from '../common'

const groups = inputLines(/\n\n/)

const part1sum = groups.map(chars).map(g => new Set(g)).map(pluck('size')).sum()

console.log('Part 1:', part1sum)

const part2sum = groups
.map(group => ({ answers: chars(group).frequencies(), groupSize: group.split(/\n/).length }))
.map(({ answers, groupSize }) => Array.from(answers.values()).count(a => a == groupSize))
.sum()

console.log('Part 2:', part2sum)