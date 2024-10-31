export const formatCountString = (
  count: number,
  singular: string,
  plural: string
): string => {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural}`;
};
