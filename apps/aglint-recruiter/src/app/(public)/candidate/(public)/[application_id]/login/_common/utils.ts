export function hideEmail(email) {
  const [localPart, domain] = email.split('@');

  if (localPart.length < 6) {
    const hiddenLocalPart = `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}`;
    return `${hiddenLocalPart}@${domain}`;
  }

  const prefix = localPart.slice(0, 3);
  const suffix = localPart.slice(-3);
  const hiddenLocalPart = `${prefix}***${suffix}`;

  return `${hiddenLocalPart}@${domain}`;
}
