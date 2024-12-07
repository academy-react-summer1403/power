import toast from "react-hot-toast"; 

const forbiddenWords = [
  "خر",
  "خیلی خری",
  "خیلی اشگولی",
  "اشگولی",
  "بیشعور",
  "کثافت",
  "گاو",
  "عنتر",
  "اشغال",
  "فحش",
  "duncy",
  "profanity",
  "dirt",
  "stupid",
  "very stupid",
];

const wordMessages : { [key: string]: string } = {
  "خر": "زبان خود را کنترل کنید!",
  "بیشعور": "این زبان را کنار بگذارید.",
  "فحش":"از نوشتن فحش در این سایت خود داری بفرمایید"
};

export const handleInputChange = (
  value: string,
  setInputText: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
): void => {
  const containsForbidden = forbiddenWords.some((word) => value.includes(word));
  
  if (containsForbidden) {
    const matchedWords = forbiddenWords.filter(word => value.includes(word));
    
    matchedWords.forEach(word => {
      toast.error(wordMessages[word] || "از کلمات بد استفاده نکن");
    });

    setErrorMessage("لطفاً از کلمات نامناسب استفاده نکنید.");
    
    const sanitizedValue = forbiddenWords.reduce((acc: string, word: string) => {
      const regex: RegExp = new RegExp(word, "g");
      return acc.replace(regex, '*'.repeat(word.length));
    }, value);
    
    setInputText(sanitizedValue);
  } else {
    setErrorMessage("");
    setInputText(value);
  }
};