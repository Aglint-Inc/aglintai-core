export const getFullName = (firstName: string, lastName: string) => {
  return [firstName, lastName]
    .filter(Boolean)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(' ');
};
