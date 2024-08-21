export default function determineIcon(string) {
    if (string.includes("sm") || string.includes("amz")) return "📦"
    if (string.includes("ltl")) return "🚚"
    return "📦"
}