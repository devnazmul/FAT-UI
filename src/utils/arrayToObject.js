export const arrayToObject = (array) =>
  array.reduce((acc, item) => {
    Object.entries(item).forEach(([key, value]) => {
      acc[key] = value;
    });
    return acc;
  }, {});
