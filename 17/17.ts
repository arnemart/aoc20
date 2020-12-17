import { $, cond, count, fillArray, filter, flatten, getIn, inputLines, is, map, pluck, range, repeat, split, within, memoize, reduce, add } from '../common'

interface Grid extends Array<Grid | string> {}

const initialState: Grid = [$(inputLines(), map(split()))]
const initialState4d: Grid = [initialState]

const coords = [-1, 0, 1]

const generateNeighbours = (dims: number): number[][] => dims <= 1 ?
  $(coords, map(c => [c])) :
  $(generateNeighbours(dims - 1),
    map(n => $(coords,
      map(c => [...n, c]))),
    flatten())

const neighbours: (dims: number) => number[][] = memoize((dims) => $(dims,
  generateNeighbours,
  filter(reduce((allNonZero: boolean, n) => (allNonZero || n != 0), false))))

const countDimensions = (grid: Grid | string): number => Array.isArray(grid) ? 1 + countDimensions(grid[0]) : 0

const emptyGrid = (sizes: number[]): Grid => fillArray(sizes[0], sizes.length == 1 ? '.' : emptyGrid(sizes.slice(1)))

const expand = (grid: Grid): Grid => {
  const dims = countDimensions(grid)
  if (dims == 1) {
    return ['.', ...grid, '.']
  }
  const sizes: number[] = $(range(dims - 1), map(n => fillArray(n + 1, 0)), map(ns => $(grid, getIn(...ns), pluck('length'), add(2))))
  return [
    emptyGrid(sizes),
    ...$(grid, map(expand)),
    emptyGrid(sizes)
  ]
}

const countActiveNeighbours = (grid: Grid, initialCoords: number[]): number => $(neighbours(initialCoords.length),
  map(map((n, i) => initialCoords[i] + n)), count(coords => $(grid, getIn(...coords), is('#'))))

const alive = (cell: string, activeNeigbours: number) => $(cell,
  cond([
    ['#', within(2, 3)(activeNeigbours) ? '#' : '.'],
    ['.', activeNeigbours == 3 ? '#' : '.']
  ]))

const step = (initialGrid: Grid): Grid => {
  const expandedGrid = expand(initialGrid)
  const recur = (grid: Grid, coords: number[] = []): Grid => countDimensions(grid) <= 1 ?
    $(grid, map((cell: string, c) => alive(cell, countActiveNeighbours(expandedGrid, [...coords, c])))) :
    $(grid, map((part: Grid, c) => recur(part, [...coords, c])))

  return recur(expandedGrid)
}

const countAllActive = (grid: Grid): number => $(grid, flatten(Infinity), count(is('#')))

console.log('Part 1:', $(initialState, repeat(6, step), countAllActive))
console.log('Part 2:', $(initialState4d, repeat(6, step), countAllActive))