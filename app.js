import { configDotenv } from "dotenv";
import { Client } from "@notionhq/client";

import parseOrder from "./util/parseOrder.js";
import determineIcon from "./util/determineIcon.js";
import parseTags from "./util/parseTags.js";

configDotenv()


const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

let value = "Plan B Skateboards #sm bds /tomorrow 9:35pm"
const order = parseOrder(value)


async function addOrder(order) {
    const { customerName: name, tags, date } = order
    let icon = determineIcon(tags)
    let parsedTags = parseTags(tags)
    // let convertedDate = Sugar.Date.create(date)
    // console.log(name, tags, date, icon, convertedDate)
    const response = await notion.pages.create({
        parent: {
            type: "database_id",
            database_id: process.env.DATABASE_ID
        },
        icon: {
            type: "emoji",
            emoji: icon
        },
        properties: {
            Name: {
                type: 'title',
                title: [
                    {
                        type: 'text',
                        text: {
                            content: name
                        }
                    }
                ],
            },
            "Planned Date": {
                type: 'date',
                date: {
                    start: date
                },
            },
            Status: {
                type: 'status',
                status: {
                    name: "Processing"
                }
            },
            Tags: {
                "multi_select": parsedTags
            }
        },
    })
    console.log(response.created_time)
}

const created = addOrder(order)
addOrder(parseOrder('independent trucks #sm fs /today 8pm'))