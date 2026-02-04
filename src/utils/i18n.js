export const getText = (value, language = "en") => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value[language]) return value[language];
  return value.en || value.zh || "";
};

export const formatDate = (dateString, language = "en") => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  const locale = language === "zh" ? "zh-CN" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
};

export const formatYearMonth = (dateString, language = "en") => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  const locale = language === "zh" ? "zh-CN" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long"
  }).format(date);
};
