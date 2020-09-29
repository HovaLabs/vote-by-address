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
