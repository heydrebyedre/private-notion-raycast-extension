export default function parseTags(str) {
    const tagArray = []
    if (str.includes("bds")) tagArray.push({ name: "Blind Drop Ship" })
    if (str.includes("fs")) tagArray.push({ name: "Free Shipping" })
    if (str.includes("ltl")) tagArray.push({ name: "Less Than Truckload" })
    if (str.includes("sm")) tagArray.push({ name: "Small Parcel" })
    if (str.includes("eqo")) tagArray.push({ name: "Webshop Order" })
    if (str.includes("amz")) tagArray.push({ name: "Amazon" })
    return tagArray
}