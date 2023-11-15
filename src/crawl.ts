import { JSDOM } from 'jsdom'

export async function crawl(baseUrl: string, currentUrl: string, pages: Map<string, number>) {
  const baseUrlObj = new URL(baseUrl)
  const currentUrlObj = new URL(baseUrl)

  if (baseUrlObj.hostname != currentUrlObj.hostname) {
    return pages
  }

  const normilizeCurrentUrl = normilizeUrl(currentUrl)
  if (pages.has(normilizeCurrentUrl)) {
    pages.set(normilizeCurrentUrl, pages.get(normilizeCurrentUrl)! + 1)
    return pages
  }

  pages.set(normilizeCurrentUrl, 1)

  console.log('activly crawling', currentUrl)
  try {
    const resp = await fetch(baseUrl)

    if (resp.status > 399) {
      console.log('error in fetch with status code:', resp.status)
      return pages
    }

    const contentType = resp.headers.get('content-type')
    if (!contentType?.includes('text/html')) {
      console.log('error in fetch incorrect content type:', contentType)
      return pages
    }

    const htmlBody = await resp.text()
    const nextUrls = getURLsFromHTML(htmlBody, baseUrl)
    for (const nextUrl of nextUrls) {
      pages = await crawl(baseUrl, nextUrl, pages)
    }
  } catch (error) {
    console.log('error in fetch', JSON.stringify(error))
  }

  return pages
}

export function getURLsFromHTML(htmlBody: string, baseUrl: string): string[] {
  var urls = []
  const dom = new JSDOM(htmlBody)

  const linkElms = dom.window.document.querySelectorAll('a')
  for (const linkElm of linkElms) {
    try {
      const link = new URL(linkElm.href.slice(0, 1) == '/' ? `${baseUrl}${linkElm.href}` : linkElm.href)
      urls.push(link.href)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  return urls
}

export function normilizeUrl(url: string): string {
  const urlObj = new URL(url)
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`

  if (hostpath.length > 0 && hostpath.slice(-1) == '/') {
    return hostpath.slice(0, -1)
  }

  return hostpath
}
