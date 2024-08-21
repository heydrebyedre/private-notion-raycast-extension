import capitalCase from "./capitalCase.js"
import Sugar from "../node_modules/sugar-date/index.js"

export default function parseOrder(string) {
    const tagsIndex = string.indexOf("#")
    const dateIndex = string.indexOf("/")
    const customerName = capitalCase(string.split("#")[0])
    let tagsString = string.slice(tagsIndex).split("/")[0]
    tagsString = tagsString.substring(1, tagsString.length)
    let dateString = string.slice(dateIndex)
    dateString = dateString.substring(1, dateString.length)
    let parsedTimeStamp = Sugar.Date.create(dateString)
    return {
        customerName,
        tags: tagsString,
        date: parsedTimeStamp
    }
}
