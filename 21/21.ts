import { $, count, every, filter, flatten, inputLines, intoSet, join, keys, map, match, pluck, reduce, some, sort, split, sum, values } from '../common'

const inputReg = /^(.+) \(contains (.+)\)/
const input = $(inputLines(), map(match(inputReg)), map(([_, ingredients, allergens]) => ({
  ingredients: $(ingredients, split(' ')),
  allergens: $(allergens, split(', '))
})))

const allUnique = (what: string) => (input: { [key: string]: string[] }[]): string[] => $(input, map(pluck(what)), flatten(), intoSet, values)

const allIngredients = $(input, allUnique('ingredients'))
const allAllergens = $(input, allUnique('allergens'))

type Matches = { [allergen: string]: string[] }

const possibleMatches: Matches = $(allAllergens, reduce((matches, allergen) => {
  const linesWithAll = $(input, filter(line => line.allergens.includes(allergen)))
  const uniqueIngredients = $(linesWithAll, allUnique('ingredients'), filter(i => $(linesWithAll, every(line => line.ingredients.includes(i)))))
  matches[allergen] = uniqueIngredients
  return matches
}, {}))

const ingredientsWithAllergens = $(possibleMatches, values, flatten(), intoSet, values)
const ingredientsWithoutAllergens = $(allIngredients, filter(i => !ingredientsWithAllergens.includes(i)))

console.log('Part 1:', $(ingredientsWithoutAllergens, map(i => $(input, count(line => line.ingredients.includes(i)))), sum))

const filterOutIngredients = (matches: Matches): Matches => $(matches, values, every(v => v.length == 1)) ? matches :
  $(matches, keys, reduce((m, allergen) => {
    const ingredients = matches[allergen]
    m[allergen] = ingredients.length == 1 ? ingredients : $(ingredients, filter(ingredient =>
      !$(matches, keys, some(a => a != allergen && matches[a].length == 1 && matches[a][0] == ingredient))))
    return m
  }, {}), filterOutIngredients)

const matches = $(possibleMatches, filterOutIngredients)

console.log('Part 2:', $(matches, keys, sort(), map(allergen => matches[allergen][0]), join(',')))