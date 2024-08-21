let entry = "girl skateboards company #ltl bds eqo /today 6pm"
import Sugar from "./node_modules/sugar-date/index.js";
import { configDotenv } from "dotenv";
import { Client } from "@notionhq/client";

configDotenv()

function splitUpString(string){
    const tagIndex = string.indexOf("#")
    const dateIndex = string.indexOf("/")
    const customerName = capitalCase(string.split("#")[0])
    let tags = string.slice(tagIndex).split("/")[0]
    let date = string.slice(dateIndex)
    return {customerName: customerName, tags: tags.substring(1, tags.length), date: date.substring(1, date.length)}
}

function capitalCase(string) {
    const words = string.split(" ")
    let newString = []
    for (let word of words) {
        newString.push(word.charAt(0).toUpperCase() + word.slice(1))
    }
    return newString.join(" ")
}

function determineIcon(str) {
    if (str.includes("sm")) return "📦"
    if (str.includes("ltl")) return "🚚"
}

function parseTags(str) {
    const tagArray = []
    if (str.includes("bds")) tagArray.push({ name: "Blind Drop Ship" })
    if (str.includes("fs")) tagArray.push({ name: "Free Shipping" })
    if (str.includes("ltl")) tagArray.push({ name: "Less Than Truckload" })
    if (str.includes("sm")) tagArray.push({ name: "Small Parcel" })
    if (str.includes("eqo")) tagArray.push({ name: "Webshop Order" })
    return tagArray
}

// const { tags } = splitUpString(entry)
// console.log(tags, typeof tags)
// console.log(determineIcon(tags))

console.log(parseTags('ltl fs eqo'))

const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

async function getAllOrders() {
    const response = await notion.databases.query({
        database_id: process.env.DATABASE_ID
    })
    console.log(response.results)
}

const order = splitUpString(entry)

function testingSomething(str) {
    const { customerName: name, tags, date } = str
    // let icon = determineIcon(tags)
    let convertedDate = Sugar.Date.create(date)
    console.log(name, tags, date, convertedDate)
    return name
}

testingSomething(order)

async function addOrder(str) {
    const { customerName: name, tags, date } = str
    let icon = determineIcon(tags)
    let dataTags = parseTags(tags)
    let convertedDate = Sugar.Date.create(date)
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
                    start: convertedDate
                },
            },
            Status: {
                type: 'status',
                status: {
                    name: "Processing"
                }
            },
            Tags: {
                name: "Tags",
                type: "multi_select",
                "multi_select": {
                    options: [
                        {
                            name: "Free Shipping"
                        }
                    ]
                },
            }
        },
    })
    console.log(response.created_time)
}

// const results = getAllOrders()
// // console.log(results)
// console.log(results.properties)

const created = addOrder(order)