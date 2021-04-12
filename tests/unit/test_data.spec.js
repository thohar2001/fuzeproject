import { expect } from 'chai'
import { unixTimeToReadable } from '../../src/lib/data.js'

describe('Testing data functions', () => {
  it('unixTimeToReadable function returns right date format', () => {
    let date = "/Date(1618220914640+0200)/"
    expect(unixTimeToReadable(date)).to.equal('2021-04-12 11:48:34')
  })
})
