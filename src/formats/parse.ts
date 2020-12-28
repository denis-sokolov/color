import { keyword2rgb } from "@csstools/convert-colors";

export type ParseOutput =
  | "unparsable"
  | { r: number; g: number; b: number; opacity: number }
  | { h: number; c: number; l: number; opacity: number }
  | { h: number; s: number; l: number; opacity: number };

export function parse(rawInput: string): ParseOutput | "unparsable" {
  const input = rawInput
    .replace(/\s+/g, " ")
    .replace(/ ?; ?$/, "")
    .trim()
    .toLowerCase();

  const lch = input
    .toLowerCase()
    .match(
      /^lch ?\( ?([0-9.]+) ?% ?([0-9.]+) ?([0-9.]+)( ?\/ ?([0-9.]+ ?%?))? ?\) ?$/
    );

  try {
    if (lch) {
      const o = lch[5] || "100%";
      const opacity = o.endsWith("%")
        ? Number(o.replace(/%$/, "")) / 100
        : Number(o);
      return {
        l: Number(lch[1]),
        c: Number(lch[2]),
        h: Number(lch[3]),
        opacity,
      };
    }
  } catch (err) {
    // Ignore, try other formats
  }

  const hexShort = input.match(/^#? ?([a-f0-9]{3})([0-9a-f])?$/);
  if (hexShort) {
    return {
      r: parseInt(hexShort[1][0].repeat(2), 16),
      g: parseInt(hexShort[1][1].repeat(2), 16),
      b: parseInt(hexShort[1][2].repeat(2), 16),
      opacity: parseInt((hexShort[2] || "f").repeat(2), 16) / 255,
    };
  }

  const hexLong = input.match(/^#? ?([a-f0-9]{6})([0-9a-f]{2})?$/);
  if (hexLong) {
    return {
      r: parseInt(hexLong[1].substr(0, 2), 16),
      g: parseInt(hexLong[1].substr(2, 2), 16),
      b: parseInt(hexLong[1].substr(4, 2), 16),
      opacity: parseInt(hexLong[2] || "ff", 16) / 255,
    };
  }

  const rgb =
    input.match(
      /^rgba? ?\( ?([0-9.]+) ?, ?([0-9.]+) ?, ?([0-9.]+)( ?, ?[0-9.]+ ?%?)? ?\)$/
    ) ||
    input.match(
      /^rgba? ?\( ?([0-9.]+) ([0-9.]+) ([0-9.]+)( ?\/ ?[0-9.]+ ?%?)? ?\)$/
    );
  if (rgb)
    try {
      const o = (rgb[4] || "100%").replace(/[,/]/g, "");
      const opacity = o.endsWith("%")
        ? Number(o.replace(/%$/, "")) / 100
        : Number(o);
      return {
        r: Number(rgb[1]),
        g: Number(rgb[2]),
        b: Number(rgb[3]),
        opacity,
      };
    } catch (err) {
      // Ignore, try other formats
    }

  const hsl =
    input.match(
      /^hsla? ?\( ?([0-9.]+) ?, ?([0-9.]+) ?% ?, ?([0-9.]+) ?%( ?, ?[0-9.]+%?)? ?\)$/
    ) ||
    input.match(
      /^hsla? ?\( ?([0-9.]+) ([0-9.]+) ?% ([0-9.]+) ?%( ?\/ ?[0-9.]+%?)? ?\)$/
    );
  try {
    if (hsl) {
      const o = (hsl[4] || "100%").replace(/[,/]/g, "");
      const opacity = o.endsWith("%")
        ? Number(o.replace(/%$/, "")) / 100
        : Number(o);
      return {
        h: Number(hsl[1]),
        s: Number(hsl[2]) / 100,
        l: Number(hsl[3]) / 100,
        opacity,
      };
    }
  } catch (err) {
    // Ignore, try other formats
  }

  if (input === "transparent") return { r: 0, g: 0, b: 0, opacity: 0 };

  const keyword = keyword2rgb(input);
  if (keyword)
    return {
      r: keyword[0] * 2.55,
      g: keyword[1] * 2.55,
      b: keyword[2] * 2.55,
      opacity: 1,
    };

  return "unparsable";
}
