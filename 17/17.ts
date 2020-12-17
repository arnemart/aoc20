import { $, cond, count, fillArray, filter, flatten, getIn, inputLines, is, join, map, pipe, repeat, split, spyWith, sum, within } from '../common'

type Grid = string[][][]
type Grid4d = Grid[]
type Neighbor = { dx: number, dy: number, dz: number, dw?: number }

const initialState: Grid = [$(inputLines(), map(pipe(split())))]
const initialState4d: Grid4d = [initialState]

const coords = [-1, 0, 1]
const neighbors3d: Neighbor[] = $(coords, map(dz => $(coords, map(dy => $(coords, map(dx => ({dx, dy, dz})))))), flatten, flatten, filter(({dx, dy, dz}) => dx != 0 || dy != 0 || dz != 0))
const neighbors4d: Neighbor[] = $(coords, map(dw => $([...neighbors3d, {dx: 0, dy: 0, dz: 0}], map(n => ({...n, dw})))), flatten, filter(({dx, dy, dz, dw}) => dx != 0 || dy != 0 || dz != 0 || dw != 0))

const emptyRow = (w: number) => fillArray(w, '.')
const emptySlice = (w: number, h: number) => fillArray(h, emptyRow(w))
const emptyCube = (w: number, h: number, d: number) => fillArray(d, emptySlice(w, h))

const expand = (grid: Grid): Grid => {
  const w = grid[0].length + 2
  const h = grid[0][0].length + 2
  return [
    emptySlice(w, h),
    ...$(grid, map(slice => [
      emptyRow(w),
      ...$(slice, map(row => ['.', ...row, '.'])),
      emptyRow(w)
    ])),
    emptySlice(w, h)
  ]
}

const expand4d = (grid: Grid4d): Grid4d => {
  const h = grid[0].length + 2
  const w = grid[0][0].length + 2
  const d = grid[0][0][0].length + 2
  return [
    emptyCube(d, w, h),
    ...$(grid, map(expand)),
    emptyCube(d, w, h)
  ]
}

const countActiveNeighbors = (grid: Grid, x: number, y: number, z: number): number => $(neighbors3d,
  count(({dx, dy, dz}) => $(grid, getIn(z + dz, y + dy, x + dx), is('#'))))

const countActiveNeighbors4d = (grid: Grid4d, x: number, y: number, z: number, w: number): number => $(neighbors4d,
  count(({dx, dy, dz, dw}) => $(grid, getIn(w + dw, z + dz, y + dy, x + dx), is('#'))))

const alive = (cell: string, activeNeigbours: number) => $(cell,
  cond([
    ['#', within(2, 3)(activeNeigbours) ? '#' : '.'],
    ['.', activeNeigbours == 3 ? '#' : '.']
  ]))

const step = (initialGrid: Grid): Grid => $(initialGrid,
  expand,
  map((slice, z, grid) => $(slice,
    map((row, y) => $(row,
      map((cell, x) => alive(cell, countActiveNeighbors(grid, x, y, z))))))))

const step4d = (initialGrid: Grid4d): Grid4d => $(initialGrid,
  expand4d,
  map((cube, w, grid) => $(cube,
    map((slice, z) => $(slice,
      map((row, y) => $(row,
        map((cell, x) => alive(cell, countActiveNeighbors4d(grid, x, y, z, w))))))))))

const countAllActive = (grid: Grid): number => $(grid, flatten, flatten, count(is('#')))
const countAllActive4d = pipe(map(countAllActive), sum)

const print = spyWith((grid: Grid) => console.log($(grid, map(pipe(map(join()), join('\n'))), join('\n\n')) + '\n\n'))
const print4d = spyWith((grid: Grid4d) => console.log($(grid, map(pipe(map(pipe(map(join()), join('\n'))), join('\n\n'))), join('\n---\n')) + '\n\n'))

console.log('Part 1:', $(initialState, repeat(6, step), countAllActive))
console.log('Part 2:', $(initialState4d, repeat(6, step4d), countAllActive4d))