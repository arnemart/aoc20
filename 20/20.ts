import { $, count, every, filter, find, findWithContext, first, flatten, forEach, getIn, inputLines, is, join, last, map, match, number, pipe, pluck, product, range, reduce, repeat, reverse, slice, some, split, values } from '../common'

type Img = string[][]
type Tile = {
  id: number
  img: Img
  sides: string[]
  matches: number[]
  matchCount: number
}

const buildSides = (tile: Tile): Tile => ({
  ...tile,
  sides: [
    /* t */  $(tile.img, first, join()),
    /* r */  $(tile.img, map(last), join()),
    /* b */  $(tile.img, last, reverse, join()),
    /* l */  $(tile.img, map(first), reverse, join()),

    /* tf */ $(tile.img, first, reverse, join()),
    /* rf */ $(tile.img, map(last), reverse, join()),
    /* bf */ $(tile.img, last, join()),
    /* lf */ $(tile.img, map(first), join())
  ]
})

const tiles: Tile[] = $(inputLines(/\n\n/), map(split(/\n/)), map(lines => ({
  id: $(lines[0], match(/(\d+)/), pluck(1), number(10)),
  img: $(lines, slice(1), map(split())),
  sides: [],
  matchCount: 0,
  matches: []
})), map(buildSides), tiles => $(tiles, map(t1 => ({
  ...t1,
  matchCount: $(tiles, count(t2 => t1.id != t2.id && $(t1.sides, some(s1 => $(t2.sides, some(s2 => s1 == s2))))))
}))))

console.log('Part 1:', $(tiles, filter(t => t.matchCount == 2), map(pluck('id')), product))

const flipImg = (img: Img) => $(img, map(reverse))
const flip = (tile: Tile): Tile => ({
  ...tile,
  img: flipImg(tile.img)
})

const rotateImg = (img: Img) => $(img, map((line, x) => $(line, map((_, y) => img[img.length - 1 - y][x]))))
const rotate = (t: Tile): Tile => ({
  ...t,
  img: rotateImg(t.img)
})

const tileMap: { [id: number]: Tile } = $(tiles, reduce((m, t) => ({ ...m, [t.id]: t }), {}))

const findMatches = (tile: Tile): Tile => ({
  ...tile,
  matches: $(tileMap, values, reduce((matches, t) => {
    if (tile.id == t.id) return matches
    $(tile.sides, slice(0, 4), forEach((side, i) => {
      const index = t.sides.indexOf(side)
      if (index >= 0) {
        if (index >= 4) {
          tileMap[t.id] = $(t, repeat((10 - (index - i)) % 4, rotate), buildSides)
        } else {
          tileMap[t.id] = $(t, flip, repeat((index + i + 2) % 4, rotate), buildSides)
        }
        return matches[i] = t.id
      }
    }))
    return matches
  }, [] as number[]))
})

const matchAll = (tile: Tile) => {
  if (tile.matches.length > 0) return
  const t = findMatches(tile)
  tileMap[t.id] = t
  $(t.matches, forEach(m => {
    matchAll(tileMap[m])
  }))
}

const aCorner = $(tiles, find(t => t.matchCount == 2))

matchAll(aCorner)

const topLeft = $(tileMap, values, find(t => t.matches[0] == null && t.matches[3] == null))

const buildRow = (t: Tile, row: number[] = [t.id]): number[] => t.matches[1] == null ? row :
  buildRow(tileMap[t.matches[1]], [...row, t.matches[1]])

const buildGrid = (t: Tile, grid: number[][] = []): number[][] => {
  const row = buildRow(t)
  if (t.matches[2] != null) {
    return buildGrid(tileMap[t.matches[2]], [...grid, row])
  }
  return [...grid, row]
}

const trimImg = (img: Img): Img => $(img, slice(1, -1), map(slice(1, -1)))

const buildImage = (grid: number[][]): Img => $(grid,
  map(pipe(
    map((id: number) => tileMap[id]),
    map(pipe(pluck('img'), trimImg)),
    (imgs: Img[]) => $(range(imgs[0].length),
      map(i => $(imgs, map(pluck(i)), flatten()))))),
  flatten())

const seaMonster = $(
  '                  # \n' +
  '#    ##    ##    ###\n' +
  ' #  #  #  #  #  #   ',
  split(/\n/),
  map((line, y) => $(line, split(), map((c, x) => ({x, y, c})), filter(m => m.c == '#'))), flatten())
const seaMonsterWidth = $(seaMonster, map(pluck('x')), ns => Math.max(...ns)) + 1
const seaMonsterHeight = $(seaMonster, map(pluck('y')), ns => Math.max(...ns)) + 1

const img = $(topLeft, buildGrid, buildImage)

const findSeaMonster = (img: Img) => $(range(img.length - seaMonsterHeight), findWithContext(y => {
  const x = $(range(img.length - seaMonsterWidth), find(x =>
    $(seaMonster, every(c => $(img, getIn(y + c.y, x + c.x), is('#'))))))
  return [x != null, {x, y}]
}))

const putSeaMonsterInImg = (img: Img, dirs = 0) => {
  if (dirs == 8) return img
  const c = findSeaMonster(img)
  if (c) {
    return putSeaMonsterInImg($(img, map((row, y) => $(row, map((v, x) => $(seaMonster, some(s => (x == s.x + c[1].x && y == s.y + c[1].y))) ? 'O' : v)))), dirs)
  }
  const nextImg = dirs == 3 ? $(img, flipImg, rotateImg) : $(img, rotateImg)
  return putSeaMonsterInImg(nextImg, dirs + 1)
}

const imgWithSeaMonster = putSeaMonsterInImg(img)

console.log('Part 2:', $(imgWithSeaMonster, flatten(), count(is('#'))))
