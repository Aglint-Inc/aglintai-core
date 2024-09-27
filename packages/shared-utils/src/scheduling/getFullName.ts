export const getFullName = (
  firstName: string | null,
  lastName: string | null
) => {
  return [firstName, lastName]
    .filter(Boolean)
    .filter((s) => s !== null)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ");
};
