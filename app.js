let entry = "electronic custom distributors #ltl bds /tomorrow 6pm"
import Sugar from "./node_modules/sugar-date/index.js"

function splitUpString(string){
    const tagIndex = string.indexOf("#")
    const dateIndex = string.indexOf("/")
    const customerName = capitalCase(string.split("#")[0])
    let tags = string.slice(tagIndex).split("/")[0]
    let date = string.slice(dateIndex)
    return [customerName, tags.substring(1, tags.length), date.substring(1, date.length)]
}

function capitalCase(string) {
    const words = string.split(" ")
    let newString = []
    for (let word of words) {
        newString.push(word.charAt(0).toUpperCase() + word.slice(1))
    }
    return newString.join(" ")
}

const [customer, tags, date] = splitUpString(entry)

console.log(Sugar.Date.create('tomorrow 1pm'))

console.log(customer, tags, Sugar.Date.create(date))