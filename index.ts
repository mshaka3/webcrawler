import { argv } from 'bun'
import { crawl } from './src/crawl'

async function main() {
  if (argv.length != 3) {
    console.log('no website url provided or too many arguments provide only one')
    process.exit(1)
  }

  const baseUrl = argv[2]

  console.log('starting crawling', baseUrl)
  const pages = await crawl(baseUrl, baseUrl, new Map())
  for (const page of pages) {
    console.log(page)
  }
}

main()
