import React from 'react';

export const formatDescription = (text: string) => {
  if (!text) return "";

  if (text.includes("undefined")) {
    return <div>دیسکرپشنی برای این دوره موجود نیست.</div>;
  }

  // Clean repetitive characters
  const repeatedCharPattern = /(.)\1{3,}/g;
  const cleanedText = text.replace(repeatedCharPattern, "$1");

  // Remove unwanted special characters and HTML tags
  const specialCharPattern = /[\/\\|!#\$%\^&\*\(\)]+/g;
  const plainText = cleanedText.replace(specialCharPattern, "");

  // Handle common HTML tags, preserving them for React rendering
  const htmlPattern = /<([^>]+)>(.*?)<\/\1>/g;
  const parsedElements = [];
  let lastIndex = 0;
  let match;

  while ((match = htmlPattern.exec(plainText)) !== null) {
    const [fullMatch, tagName, content] = match;
    
    // Add plain text before the matched tag, if any
    if (match.index > lastIndex) {
      parsedElements.push(<span key={lastIndex}>{plainText.slice(lastIndex, match.index)}</span>);
    }

    // Append formatted content
    parsedElements.push(<span key={match.index} className={`formatted-${tagName}`}>{content}</span>);
    lastIndex = match.index + fullMatch.length;
  }

  // Convert sentences for list rendering
  const sentences = plainText
    .split(/[,.،]+/)  // Handles various separators (e.g., commas, Arabic comma)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence && sentence.length > 3);  // Filter out short or empty items

  return (
    <div>
      <div>{parsedElements}</div>
      <ul>
        {sentences.map((sentence, index) => (
          <li key={index}>{sentence}.</li>
        ))}
      </ul>
    </div>
  );
};
