import { hex2rgb, hsl2lch, rgb2hsl } from "@csstools/convert-colors";
import { HCLSpaceColor } from "./class";
import { parse } from "../formats";

export function colorFromHex(hex: string, opacity?: number) {
  const [r, g, b] = hex2rgb(hex);
  return colorFromRgb(r * 2.55, g * 2.55, b * 2.55, opacity);
}

/**
 * Parameter bounds: 0-~130, 0-~150, 0-360, 0-1
 */
export function colorFromLch(
  lightness: number,
  chroma: number,
  hue: number,
  opacity?: number
): HCLSpaceColor {
  return new HCLSpaceColor({
    c: chroma,
    h: hue,
    l: lightness,
    opacity: opacity ?? 1,
  });
}

/**
 * Parameter bounds: 0-360, 0-1, 0-1, 0-1
 */
export function colorFromHsl(
  hue: number,
  saturation: number,
  lightness: number,
  opacity?: number
): HCLSpaceColor {
  const [l, c, h] = hsl2lch(hue, saturation * 100, lightness * 100);
  return colorFromLch(l, c, h, opacity);
}

/**
 * Parameter bounds: 0-255, 0-255, 0-255, 0-1
 */
export function colorFromRgb(
  r: number,
  g: number,
  b: number,
  opacity?: number
): HCLSpaceColor {
  const [h, s, l] = rgb2hsl(r / 2.55, g / 2.55, b / 2.55);
  return colorFromHsl(h, s / 100, l / 100, opacity);
}

export function colorFromString(input: string): HCLSpaceColor | "unparsable" {
  const val = parse(input);
  if (val === "unparsable") return "unparsable";
  if ("r" in val) return colorFromRgb(val.r, val.g, val.b, val.opacity);
  if ("s" in val) return colorFromHsl(val.h, val.s, val.l, val.opacity);
  return colorFromLch(val.l, val.c, val.h, val.opacity);
}
