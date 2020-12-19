import { $, inputLines, map, pipe, split, match, test, join, filter, length } from '../common'

const inputParts = $(inputLines(/\n\n/))

const rules = $(inputParts[0],
  split(/\n/),
  map(match(/^(\d+): (.+)$/)),
  map(([_, n, rule]) => [n, rule] as [string, string]),
  r => new Map(r))

const buildReg = (r: string, startedWith: string, seen = new Map<string, number>()): string => {
  const rule = rules.get(r)

  seen.set(r, seen.has(r) ? seen.get(r) + 1 : 1)

  if (seen.get(r) > 10 && r == startedWith) {
    return ''
  }

  const recur = pipe(split(/\s+/),  map((s: string) => buildReg(s, startedWith, seen)), join())

  if (/^"\w+"$/.test(rule)) {
    return rule.slice(1, -1)
  } else if (/\|/.test(rule)) {
    return $(rule, split(/\s*\|\s*/), map(recur), join('|'), s => `(${s})`)
  } else {
    return $(rule, recur)
  }
}

const regex = () => $(rules.get('0'), split(/\s/), map(s => buildReg(s, s)), join(), s => new RegExp('^' + s + '$'))

const reg = regex()

const input = $(inputParts[1], split(/\n/))

console.log('Part 1:', $(input, filter(test(reg)), length))

rules.set('8', '42 | 42 8')
rules.set('11', '42 31 | 42 11 31')

const reg2 = regex()

console.log('Part 2:', $(input, filter(test(reg2)), length))