import TurndownService from "turndown";

export function toMarkDown(value: string) {
  const turndownService = new TurndownService();

  return turndownService.turndown(value);
}
