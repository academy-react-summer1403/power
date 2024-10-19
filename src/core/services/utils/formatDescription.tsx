export const formatDescription = (text: string) => {
  if (!text) return "";

  if (text.includes("undefined")) {
    return <div>دیسکرپشنی برای این دوره موجود نیست.</div>;
  }

  const cleanedText = text.replace(/[\/\\|!#\$%\^&\*\(\)]+/g, "");

  const formattedText = cleanedText
    .split(',')
    .map(sentence => sentence.trim())
    .join(' , ');

  const sentences = formattedText
    .split(".")
    .filter(Boolean)
    .map((sentence) => sentence.trim());

  return (
    <ul>
      {sentences.map((sentence, index) => (
        <li key={index}>{sentence.trim()}.</li>
      ))}
    </ul>
  );
};
