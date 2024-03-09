import {Client} from '@notionhq/client'
import {config} from 'dotenv'
// import { propertiesForNewPages } from "./sampleData.js"

config()

const pageId = process.env.NOTION_PAGE_ID as string
const apiKey = process.env.NOTION_API_KEY as string
const databaseId = `310cf079c91340ffaedf149a8ab84ff4`

const notion = new Client({auth: apiKey})

/*
---------------------------------------------------------------------------
*/

/**
 * Resources:
 * - Create a database endpoint (notion.databases.create(): https://developers.notion.com/reference/create-a-database)
 * - Create a page endpoint (notion.pages.create(): https://developers.notion.com/reference/post-page)
 * - Working with databases guide: https://developers.notion.com/docs/working-with-databases
 * Query a database: https://developers.notion.com/reference/post-database-query
 * Filter database entries: https://developers.notion.com/reference/post-database-query-filter
 */

async function addNotionPageToDatabase(databaseId, pageProperties) {
    await notion.pages.create({
        parent: {
            database_id: databaseId
        },
        properties: pageProperties // Note: Page properties must match the schema of the database
    })
}

async function queryDatabase(databaseId) {
    console.log('Querying database...')
    // This query will filter database entries and return pages that have a "Last ordered" property that is more recent than 2022-12-31. Use multiple filters with the AND/OR options: https://developers.notion.com/reference/post-database-query-filter.
    const res = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'Created',
            date: {
                after: '2019-12-31'
            }
        }
    })

    // Print filtered results
    const first = res.results[0]
    console.log(JSON.stringify(first, null, 2))

    // const url = first.properties?.URL?.url
    // const title = first.properties?.Name?.title![0]?.plain_text
    // console.log('------->url: ', url)
    // console.log('------->title: ', title)

    const webClipS = res.results.map((resultElement) => {
        return {
            url: resultElement.properties?.URL?.url,
            title: resultElement.properties?.Name?.title![0]?.plain_text
        }
    })
    console.log("------->webClipS: ", webClipS);
}

async function main() {
    await queryDatabase(databaseId)
}

main()
