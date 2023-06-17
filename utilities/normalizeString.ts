function normalizeString(string: any) {
  return String(string)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "");
}

export default normalizeString;
