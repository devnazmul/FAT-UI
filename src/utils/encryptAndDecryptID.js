export function encryptID(id) {
  return btoa(id);
}

export function decryptID(encryptedString) {
  return Number(atob(encryptedString));
}
