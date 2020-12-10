import { inputLines, within, $, pipe, map, filter, reduce, split } from '../common'

const checkHgt = (v: string): boolean => {
  const matches = v.match(/^(\d+)(in|cm)$/)
  if (matches && matches[2] == 'cm') return $(matches[1], within(150, 193))
  else if (matches && matches[2] == 'in') return $(matches[1], within(59, 76))
  return false
}

const rules: { [key: string]: (v: string) => boolean} = {
  byr: within(1920, 2002),
  iyr: within(2010, 2020),
  eyr: within(2020, 2030),
  hgt: checkHgt,
  hcl: v => /^#[0-9a-f]{6}/i.test(v),
  ecl: v => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v),
  pid: v => /^\d{9}$/.test(v)/*,
  cid: ignore*/
}

const reqFields = Object.keys(rules)

interface PP {
  [key: string]: string
}

const input: PP[] = $(
  inputLines(/\n\n/),
  map(pipe(split(/\s+/), map(split(':')), reduce((p, parts) => ({
    ...p,
    [parts[0]]: parts[1]
  }), {})))
)

const valid1 = (pp: PP): boolean => reqFields.every(key => key in pp)
const valid2 = (pp: PP): boolean => reqFields.every(key => rules[key](pp[key]))

const part1valid = $(input, filter(valid1))
const part2valid = $(part1valid, filter(valid2))

console.log('Part 1:', part1valid.length)
console.log('Part 2:', part2valid.length)