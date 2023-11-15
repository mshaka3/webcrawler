import { expect, test } from 'bun:test'
import { normilizeUrl } from '../src/crawl'

test('test normilizeUrl strip protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normilizeUrl(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('test normilizeUrl strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normilizeUrl(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('test normilizeUrl captials', () => {
  const input = 'https://BLOG.boot.dev/path/'
  const actual = normilizeUrl(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})
