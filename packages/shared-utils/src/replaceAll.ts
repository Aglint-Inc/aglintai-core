export function replaceAll(str: string, find: string, replace: string) {
  // Split the string by the find substring and join the parts with the replace substring
  return str.split(find).join(replace);
}
