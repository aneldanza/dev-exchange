export const formatCountString = (
  count: number,
  singular: string,
  plural: string
): string => {
  return Math.abs(count) === 1 ? `${count} ${singular}` : `${count} ${plural}`;
};

export const removeSelectElement = (body: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, "text/html");

  // Remove all <select> elements
  const selects = doc.querySelectorAll("select");
  selects.forEach((select) => select.remove());

  // Serialize the modified HTML back to a string
  return doc.body.innerHTML;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
