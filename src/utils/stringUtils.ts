import { startCase, toLower } from "lodash";

export function snakeToTitleCase(str: string): string {
  return startCase(toLower(str.replace(/_+/g, " "))).trim();
}

export function isValidURL(url: string): boolean {
  try {
    const parsedURL = new URL(url);
    return parsedURL.protocol === "http:" || parsedURL.protocol === "https:";
  } catch {
    return false;
  }
}
