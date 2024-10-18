export const formatDescription = (text: string) => {
    if (!text) return "";
  
    const sentences = text
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