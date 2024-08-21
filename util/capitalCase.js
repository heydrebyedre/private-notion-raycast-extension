export default function capitalCase(string) {
    const words = string.split(" ")
    let newString = []
    for (let word of words) {
        newString.push(word.charAt(0).toUpperCase() + word.slice(1))
    }
    return newString.join(" ")
}