import React from 'react';

export const formatDescription = (text: string) => {
  if (!text) return "";

  if (text.includes("undefined")) {
    return <div>دیسکرپشنی برای این دوره موجود نیست.</div>;
  }

  const htmlPattern = /<[^>]+>(.*?)<\/[^>]+>/g;
  const cleanedText = text.replace(/[\/\\|!#\$%\^&\*\(\)]+/g, ""); 
  
  const repeatedWordPattern = /(.)\1{3,}/g;
  const formattedText = cleanedText.replace(repeatedWordPattern, match => match[0]);

  const sentences = formattedText
    .split(' , ')
    .map(sentence => sentence.trim())
    .filter(Boolean);

  const htmlMatches = [...formattedText.matchAll(htmlPattern)];
  const elements = htmlMatches.map((match, index) => (
    <div key={index}>{match[1]}</div>
  ));

  return (
    <div>
      {elements}
      <ul>
        {sentences.map((sentence, index) => (
          <li key={index}>{sentence.trim()}.</li>
        ))}
      </ul>
    </div>
  );
};
