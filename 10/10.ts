import { inputLines } from '../common'

const inputJoltages = inputLines().numbers().sortNumeric()
const joltages = [...inputJoltages, inputJoltages.last() + 3]

const { ones, threes, runs } = joltages
.zip([0, ...joltages])
.map(([j, p]) => j - p)
.reduce(({ ones, threes, runs, currentRun }, diff) => ({
  ones: ones + (diff == 1 ? 1 : 0),
  threes: threes + (diff == 3 ? 1 : 0),
  runs: runs.concat(diff != 1 && currentRun > 1 ? currentRun + 1 : []),
  currentRun: diff == 1 ? currentRun + 1 : 0
}), { ones: 0, threes: 0, runs: [] as number[], currentRun: 0 })

const validPermutations = runs.map(n => Math.pow(2, n - 2) - (n >= 5 ? 1 : 0)).product()

console.log('Part 1:', ones * threes)
console.log('Part 2:', validPermutations)