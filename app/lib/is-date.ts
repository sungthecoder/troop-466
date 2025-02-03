export const isDate = function (date: string) {
  return (
    (new Date(date) as unknown as string) !== "Invalid Date" &&
    !isNaN(new Date(date) as unknown as number)
  );
};
