import { $, every, filter, flatten, inputLines, length, map, not, numbers, pipe, pluck, product, range, slice, some, split, sum, within } from '../common'

type Rule = { name: string, validRanges: [number, number][] }
type Ticket = number[]

const [rulesStr, yourTicketStr, nearbyTicketsStr] = inputLines(/\n\n/)
const rules: Rule[] = $(rulesStr, split(/\n/), map(split(': ')), map(([name, ranges]) => ({
  name, validRanges: $(ranges, split(' or '), map(pipe(split('-'), numbers())))
})))

const yourTicket: Ticket = $(yourTicketStr, split(/\n/), pluck(1), split(','), numbers())
const nearbyTickets: Ticket[] = $(nearbyTicketsStr, split(/\n/), slice(1), map(pipe(split(','), numbers())))

const checkRule = (value: number) => (rule: Rule) => $(rule.validRanges,
  some(range => within(range[0], range[1])(value)))

const checkRules = (value: number) => $(rules, some(checkRule(value)))

const allInvalidValues = $(nearbyTickets, flatten, filter(not(checkRules)), sum)

console.log('Part 1:', allInvalidValues)


const checkTicket = every(checkRules)

const validTickets = $(nearbyTickets, filter(checkTicket))

type ValidPos = { name: string, validPositions: number[] }

const filterPositions = (validPositions: ValidPos[]): ValidPos[] => $(validPositions, every(pos => pos.validPositions.length <= 1)) ?
  validPositions :
  filterPositions($(validPositions, map(({ name, validPositions: poss }, i) => ({
    name,
    validPositions: poss.length == 1 ? poss : $(poss, filter(pos =>
      $(validPositions, filter((vp, j) => j != i && vp.validPositions.length == 1 && vp.validPositions[0] == pos), length) == 0))
  }))))

const allValidPositions: ValidPos[] = $(rules,
  map(rule => ({
    name: rule.name,
    validPositions: $(
      range(validTickets[0].length),
      filter(i => $(validTickets, every(ticket => checkRule(ticket[i])(rule))))
    )
  })),
  filterPositions
)

const validPositions = filterPositions(allValidPositions)

const departureProduct = $(validPositions, filter(p => /^departure/.test(p.name)), map(p => yourTicket[p.validPositions[0]]), product)

console.log('Part 2:', departureProduct)