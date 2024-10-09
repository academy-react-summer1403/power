export const DateConvert = (date: string) => {
  const dateObj = new Date(date);

  const DateFa = dateObj.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return DateFa;
};
