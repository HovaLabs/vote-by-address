import { Text } from "../design-system";

const isLink = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
); // fragment locator

export const getIsLink = (string: string): boolean => {
  return !!isLink.test(string);
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
