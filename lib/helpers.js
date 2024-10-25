export function formatTextToHTML(rawText) {
  const lines = rawText.replaceAll("\n", "<br />").split("<br />")
  return lines
    .map((line) => {
      const hashCount = (line.match(/#/g) || []).length
      if (hashCount === 2) {
        const parts = line.split("#").filter(Boolean)
        const boldText = parts[0].trim()
        const regularText = parts[1]?.trim() || ""
        return `<span style="font-size: 36px; margin-right: 12px; font-weight: 700">${boldText}</span> <span style="font-size: 24px;">${regularText}</span>`
      } else {
        if (line === "") {
          return null
        }
        return `<span style="font-size: 24px;">${line}</span>`
      }
    })
    .join("<br />")
}
