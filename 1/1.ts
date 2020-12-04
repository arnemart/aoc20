import { inputLines, logAndReturn } from '../common'

const input = inputLines().map(line => parseInt(line, 10))

input.some((n, i) =>
  input.slice(i + 1).some(n2 =>
    (n + n2 == 2020) && logAndReturn()('Part 1:', n * n2)
  )
)

input.some((n, i) =>
  input.slice(i + 1).some((n2, i2) =>
    input.slice(i2 + 1).some(n3 =>
      (n + n2 + n3 == 2020) && logAndReturn()('Part 2:', n * n2 * n3)
    )
  )
)
