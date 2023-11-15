import { expect, test } from 'bun:test'
import { getURLsFromHTML } from '../src/crawl'

test('test getURLsFromHTML', () => {
  const htmlBodyInput = `
    <html>
    <body>
    <a href="https://blog.boot.dev/">
        Boot.dev blog
    </a>
    </body>
    </html>`
  const baseUrlInput = 'https://blog.boot.dev'

  const actual = getURLsFromHTML(htmlBodyInput, baseUrlInput)
  const expected = ['https://blog.boot.dev/']
  expect(actual).toEqual(expected)
})

test('test getURLsFromHTML relative urls', () => {
  const htmlBodyInput = `
    <html>
    <body>
    <a href="/path/">
        Boot.dev blog
    </a>
    </body>
    </html>`
  const baseUrlInput = 'https://blog.boot.dev'

  const actual = getURLsFromHTML(htmlBodyInput, baseUrlInput)
  const expected = ['https://blog.boot.dev/path/']
  expect(actual).toEqual(expected)
})

test('test getURLsFromHTML multible', () => {
  const htmlBodyInput = `
    <html>
    <body>
    <a href="https://blog.boot.dev/path1/">
        Boot.dev blog path 1 
    </a>
    <a href="/path2/">
        Boot.dev blog path 2
    </a>
    </body>
    </html>`
  const baseUrlInput = 'https://blog.boot.dev'

  const actual = getURLsFromHTML(htmlBodyInput, baseUrlInput)
  const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
  expect(actual).toEqual(expected)
})

test('test getURLsFromHTML invalid', () => {
  const htmlBodyInput = `
    <html>
    <body>
    <a href="invalid">
        Boot.dev blog
    </a>
    </body>
    </html>`
  const baseUrlInput = 'https://blog.boot.dev'

  const actual = getURLsFromHTML(htmlBodyInput, baseUrlInput)
  expect(actual).toEqual([])
})
