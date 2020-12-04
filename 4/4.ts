import { inputLines } from '../common'

type PP = {
  [key: string]: string
}

const checkNum = (min: number, max: number) => (year: string): boolean => {
  const n = parseInt(year)
  return n != null && n >= min && n <= max
}

const checkHgt = (v: string): boolean => {
  const matches = v.match(/^(\d+)(in|cm)$/)
  if (matches && matches[2] == 'cm') return checkNum(150, 193)(matches[1])
  else if (matches && matches[2] == 'in') return checkNum(59, 76)(matches[1])
  return false
}

const rules: { [key: string]: (v: string) => boolean} = {
  byr: checkNum(1920, 2002),
  iyr: checkNum(2010, 2020),
  eyr: checkNum(2020, 2030),
  hgt: checkHgt,
  hcl: v => /^#[0-9a-f]{6}/i.test(v),
  ecl: v => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v),
  pid: v => /^\d{9}$/.test(v)/*,
  cid: ignore*/
}

const reqFields = Object.keys(rules)

const input: PP[] = inputLines(/\n\n/).map(pp =>
  pp.split(/\s+/).reduce((p, kv) => {
    const parts = kv.split(':')
    p[parts[0]] = parts[1]
    return p
  }, {})
)

const valid1 = (pp: PP): boolean => reqFields.every(key => key in pp)
const valid2 = (pp: PP): boolean => reqFields.every(key => rules[key](pp[key]))

const part1valid = input.filter(valid1)
const part2valid = part1valid.filter(valid2)

console.log('Part 1:', part1valid.length)
console.log('Part 2:', part2valid.length)