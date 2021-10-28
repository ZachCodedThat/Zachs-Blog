// replacer for regex to replace all markdown bold and italic and underline markup with jsx

export const regex = {
  bold: /\*\*(.*?)\*\*/g,
  italic: /\_(.*?)\_/g,
  underline: /__(.*?)__/g,
  strikethrough: /~~(.*?)~~/g,
  code: /`(.*?)`/g,
  link: /\[(.*?)\]\((.*?)\)/g,
  image: /!\[(.*?)\]\((.*?)\)/g,
  inlineCode: /\`(.*?)\`/g,
  blockquote: /\n\s*>\s*(.*?)\n/g,
  list: /\n\s*(-|\*)\s+(.*?)\n/g,
  listItem: /\n\s*(-|\*)\s+(.*?)\n/g,
  table: /\n\s*\|\s*(.*?)\n/g,
  tableRow: /\n\s*\|\s*(.*?)\n/g,
  tableCell: /\n\s*\|\s*(.*?)\n/g,
  hr: /\n\s*-{3,}\s*\n/g,
};

export const regexReplace = {
  bold: (match, p1) => `${p1}`,
  italic: (match, p1) => `${p1}`,
  underline: (match, p1) => `<u>${p1}</u>`,
  strikethrough: (match, p1) => `<s>${p1}</s>`,
  code: (match, p1) => `<code>${p1}</code>`,
  link: (match, p1, p2) => `<a href="${p2}">${p1}</a>`,
  image: (match, p1, p2) => `<img src="${p2}">`,
  inlineCode: (match, p1) => `<code>${p1}</code>`,
  blockquote: (match, p1) => `<blockquote>${p1}</blockquote>`,
  list: (match, p1, p2) => `<li>${p2}</li>`,
  listItem: (match, p1, p2) => `<li>${p2}</li>`,
  table: (match, p1) => `<table>${p1}</table>`,
  tableRow: (match, p1) => `<tr>${p1}</tr>`,
  tableCell: (match, p1) => `<td>${p1}</td>`,
  hr: (match, p1) => `<hr>`,
};

// replacing markdown markup with empty string
export const removeMarkdown = (text) => {
  // eslint-disable-line
  Object.keys(regex).forEach((key) => {
    text = text.replace(regex[key], "");
  });
  return text;
};

// replacing Madrkdown markup with jsx
export const replaceMarkdownWithJsx = (text) => {
  // eslint-disable-line
  Object.keys(regex).forEach((key) => {
    text = text.replace(regex[key], regexReplace[key]);
  });
  return text;
};
