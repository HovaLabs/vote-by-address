const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }

  return true;
};

export const getIsLink = (string: string): boolean => {
  return isValidUrl(string);
};

export const getDateInfo = (
  day: string
): { isInPast: boolean; isToday: boolean; isInFuture: boolean } => {
  const today = new Date();
  const formattedDate = new Date(`${day.split(":")[0]} ${today.getFullYear()}`);

  return {
    isInPast: formattedDate < today,
    isToday:
      formattedDate.getDate() === today.getDate() &&
      formattedDate.getMonth() === today.getMonth() &&
      formattedDate.getFullYear() === today.getFullYear(),
    isInFuture: formattedDate > today,
  };
};

export const urlify = (text: string): any => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return (
      '<a rel="noopener noreferrer" target="_blank" href="' +
      url +
      '">' +
      url +
      "</a>"
    );
  });
};
