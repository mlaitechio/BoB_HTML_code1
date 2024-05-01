function getWebsiteLinks(text) {
  const results = [];
  let startIndex = 0;
  let extraBraces = 0;
  let extraSq = false;
  let startBlob = [];
  let endBlob = [];

  while (startIndex < text.length) {
    if (text[startIndex] === "[") {
      startBlob.push(startIndex);
      extraSq = true;
    }
    if (text[startIndex] === "]") {
      extraSq = false;
    }

    if (!extraSq) {
      if (text[startIndex] === "(") {
        extraBraces += 1;
      }

      if (text[startIndex] === ")") {
        extraBraces -= 1;
        if (!extraBraces) {
          endBlob.push(startIndex + 1);
        }
      }
    }

    startIndex = startIndex + 1;
  }

  startBlob.forEach((element, index) => {
    if (endBlob[index]) results.push(text.slice(element, endBlob[index]));
  });

  return results;
}

const getDomainWithUrl = (str) => {
  const orgStr = str;

  let startIndex = 0;
  let domainStartPoint = 0;
  let domainEndPoint = 0;
  let urlStartPoint = 0;

  while (startIndex < str.length) {
    if (str[startIndex] === "[") domainStartPoint = startIndex + 1;
    if (str[startIndex] === "]") {
      domainEndPoint = startIndex;
      urlStartPoint = startIndex + 2;
    }
    startIndex += 1;
  }

  const domainStr = str.slice(domainStartPoint, domainEndPoint);
  const urlStr = str.slice(urlStartPoint, -1);
  return [orgStr, domainStr, urlStr];
};

const convertPipeTableToHTML = (pipeTableStr) => {
  const tableRows = pipeTableStr.split("\n").filter((row) => row.trim() !== "");
  console.log(tableRows);
  let p = "<p>";
  let htmlTable = "<table>";
  for (let i = 0; i < tableRows.length; i++) {
    const table1 = tableRows[i].match(/\|(.*?)\|/);
    const extra = tableRows[i].match(/\|*[-]\|/);
    if (extra) {
      tableRows[i] = " ";
    }
    if (table1) {
      const columns = tableRows[i].split("|").map((column) => column.trim());
      if (i === 0) {
        // Header row
        htmlTable += "<tr>";
        for (const header of columns) {
          htmlTable += `<td>${header}</td>`;
        }
        htmlTable += "</tr>";
      } else {
        // Data rows
        htmlTable += "<tr>";
        for (const data of columns) {
          htmlTable += `<td>${data}</td>`;
        }
        htmlTable += "</tr>";
      }
    } else {
      p += tableRows[i];
      //console.log(data)
      p += `</p>`;
    }
  }
  htmlTable += "</table>";

  return p + htmlTable;
};

export function formatResponse(val) {
  const boldRegex = /\*\*(.*?)\*\*/g;
  let content = val;
  const boldMatches = content.match(boldRegex);

  if (boldMatches) {
    for (var i = 0; i < boldMatches.length; i++) {
      var boldMatch = boldMatches[i];
      const textInsideBold = boldMatch.replace(/\*\*/g, ""); // Remove the **
      const boldReplacement = `<strong>${textInsideBold}</strong>`;
      content = content.replace(boldMatch, boldReplacement);
    }
  }

  const matches = getWebsiteLinks(content);

  if (matches) {
    matches.forEach((match) => {
      let [, text, link] = getDomainWithUrl(match);
      let replacement;

      if (
        link.endsWith(".png") ||
        link.endsWith(".jpg") ||
        link.endsWith(".jpeg")
      ) {
        replacement = `<img src="${link}" style="width: 250px; height: 150px; margin: 40px 52px 20px 20px;">`;
      } else {
        replacement = `<a href="${link}" target="_blank">${text}</a>`;
      }
      content = content.replace(match, replacement);
    });
  }

  const urlPattern =
    /<a[^>]*>.*?<\/a>|<img[^>]*>.*?<\/img>|\b(https?:\/\/[^\s<>\)]+(?![^<>]*>|[^"]*?<\/a>|[^"]*?<\/img>))\b/g;

  const unmatchedUrls = content.match(urlPattern);

  // console.log(unmatchedUrls);

  if (unmatchedUrls) {
    for (const link of unmatchedUrls) {
      if (!link.startsWith("<a") && !link.startsWith("<img")) {
        const hyperlink = `<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>`;
        content = content.replace(link, hyperlink);
      }
    }
  }

  const pipeTableRegex = /\|.*?\|/g;

  //const pipeTableRegex = /\s*\|([\s\S]*?)\|/g;
  const pipeTableMatches = content.match(pipeTableRegex);

  if (pipeTableMatches) {
    const htmlTable = convertPipeTableToHTML(content);
    content = htmlTable;
  }

  return content;
}


// const ans = data.response.slice(2);

// let answer = ""

// ans.forEach(element => {
//   if(element[1][1][0][0][1][0][1]) answer += element[1][1][0][0][1][0][1]
// });