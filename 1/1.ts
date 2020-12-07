import { inputLines, returnAndLog } from '../common'

const input = inputLines().map(line => parseInt(line, 10)).sort((a, b) => a - b)

type FwcCallback<T, U> = (value: T, i: number) => [found: boolean, context: U]
type FwcResponse<T, U> = [value: T, context: U] | undefined

declare global {
  interface Array<T> {
    findWithContext<U>(callback: FwcCallback<T, U>): FwcResponse<T, U>
  }
}

Array.prototype.findWithContext = function<T, U>(callback: FwcCallback<T, U>): FwcResponse<T, U> {
  let i = 0
  for (const v of this) {
    const [found, context] = callback(v, i++)
    if (found) {
      return [v, context]
    }
  }
}

const part1numbers = input.findWithContext((n, i) => {
  const v = input.slice(i + 1).find(n2 => n + n2 == 2020)
  return [v != null, v]
})

console.log('Part 1:', part1numbers[0] * part1numbers[1])

const part2numbers = input.findWithContext((n, i) => {
  const v = input.slice(i + 1).findWithContext((n2, j) => {
    const v2 = input.slice(j + 1).find(n3 => n + n2 + n3 == 2020)
    return [v2 != null, v2]
  })
  return [v != null, v]
}).flat()

console.log('Part 2:', part2numbers[0] * part2numbers[1] * part2numbers[2])