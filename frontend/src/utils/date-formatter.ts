export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return { day: NaN, month: "Invalid Date" };
  }

  const day = date.getUTCDate();
  const month = date.toLocaleDateString("es-ES", {
    month: "short",
    timeZone: "UTC",
  });

  return { day, month };
};
