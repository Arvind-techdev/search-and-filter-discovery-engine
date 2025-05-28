// Utility functions for search logic
export const escapeRegex = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const normalize = (val: any) => (val || "").toString().toLowerCase().trim();

export const findMatch = (arr: string[], input: string) =>
  arr.find((val) => normalize(input).includes(normalize(val))) || null;
