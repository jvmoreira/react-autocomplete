import { StringHighlight } from './string-highlight';

export function buildStringHighlight(highlight: string, value: string): StringHighlight {
  const startIndex = value.toLowerCase().indexOf(highlight.toLowerCase());
  const endIndex = startIndex + highlight.length;

  if (startIndex < 0) {
    throw new Error(`buildStringHighlight - Value "${value}" does not contain targeted highlight "${highlight}"`);
  }

  return {
    prefix: value.slice(0, startIndex),
    highlight: value.slice(startIndex, endIndex),
    suffix: value.slice(endIndex),
  };
}
