export function formatTextToHTML(rawText) {
  const lines = rawText.replaceAll("\n", "<br />").split("<br />")
  return lines
    .map((line) => {
      const hashCount = (line.match(/#/g) || []).length
      if (hashCount === 2) {
        const parts = line.split("#").filter(Boolean)
        const boldText = parts[0].trim()
        const regularText = parts[1]?.trim() || ""
        return `<span class="workout-title">${boldText}</span> <span class="workout-text">${regularText}</span>`
      } else {
        if (line === "") {
          return null
        }
        return `<span class="workout-text">${line}</span>`
      }
    })
    .join("<br />")
}
