import { JSDOM } from 'jsdom'
import { isProbablyReaderable, Readability } from '@mozilla/readability'
import axios from 'axios'

// const url = 'https://example.com'
const url = 'https://www.usebruno.com/blog/bootstrapping'

main(url)

async function main(url: string) {
  let document: Document | undefined

  try {
    document = await getDOMFromWebPage(url)
  } catch (error) {
    console.error(' getDOMFromWebPage Error:', error)
  }

  if (document === undefined) {
    console.log('document is undefined')
    return
  }

  if (document !== undefined && !isProbablyReaderable(document)) {
    console.log('This page can not be parse correctly by readability.')
  }

  let article = new Readability(document).parse()
  console.log('------->article: ', article)
}

async function getDOMFromWebPage(url: string) {
  let response: Response | undefined
  try {
    // response = await axios.get(url)
    response = await fetch(url)
  } catch (error) {
    console.log('axios Error:', error)
  }

  if (response === undefined) {
    console.log('response is undefined')
    return
  }

  try {
    const dom = new JSDOM(await response.text())
    const document = dom.window.document
    return document
  } catch (error) {
    // @ts-ignore
    console.error('JSDOM Error:', error.message)
  }
}
