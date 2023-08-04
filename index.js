/**
 * Strips the prefix from the keys of the given key-value pairs
 * @param {string} htmlContent - HTML content which needs to be highlighted
 * @param {string} plainText - This plain text is extracted from htmlContent
 * @param {array} plainTextPositions - Array of Objects with start and end positions of words in plainText (Not the positions in HTML)
 * @returns {string} Using the positions in plainText, find the appropriate positions in htmlContent, highlight the content and return it
 */
const htmlContent = " <p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href=\"https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI\">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href=\"https://iris.steeleye.co/market/instruments?search=ES0113900J37\">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley\">here</a>.<br><br>-------------------------------------<br><br><img src=\"https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png\" alt=\"Rick Astley\" style=\"width:100px;height:100px;\"></span></p>"
const plainText = "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------"
const plainTextPositions = [{start: 241, end: 247}, {start: 518, end: 525}]

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    htmlContent = htmlContent.trim()
    plainTextPositions.sort((a, b) => a.start - b.start)
    let isTag = true
    let textPosition = 0
    let index = 0
    for (let i = 0; i < htmlContent.length; i++) {
        if (index >= plainTextPositions.length) break
        if (htmlContent.charAt(i) === '<') isTag = true
        if (htmlContent.charAt(i) === '>') {
            isTag = false
            continue
        }
        if (!isTag) {
            if (plainText.charAt(textPosition) === " ") {
                while (plainText.charAt(textPosition) === " ") {
                    textPosition++
                }
                i--
            }
            if (plainText.charAt(textPosition) === htmlContent.charAt(i)) {
                if (textPosition === plainTextPositions[index].start) {
                    htmlContent = `${htmlContent.slice(0, i)}<mark>${htmlContent.slice(i)}`
                    i += 5
                }
                if (textPosition === plainTextPositions[index].end - 1) {
                    htmlContent = `${htmlContent.slice(0, i + 1)}</mark>${htmlContent.slice(i + 1)}`
                    i += 6
                    index++
                }
                textPosition++
            }
        }
    }
    return htmlContent
}

const highlightedHTMLContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions)
console.log(highlightedHTMLContent)
module.exports = {highlightHTMLContent}