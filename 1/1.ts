import { readFileSync } from 'fs'

const input = readFileSync('input.txt').toString().split(/\n/).map(line => parseInt(line, 10))

outer: for (let i = 0; i < input.length; i++) {
  inner: for (let j = i + 1; j < input.length; j++) {
    if (input[i] + input[j] == 2020) {
      console.log('Part 1:', input[i] * input[j])
      break outer
    }
  }
}

outer2: for (let i = 0; i < input.length; i++) {
  inner2: for (let j = i + 1; j < input.length; j++) {
    evenInnerer: for (let k = j + 1; k < input.length; k++) {
      if (input[i] + input[j] + input[k] == 2020) {
        console.log('Part 2:', input[i] * input[j] * input[k])
        break outer2
      }
    }
  }
}