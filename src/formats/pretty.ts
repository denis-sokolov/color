import { rgb2hsl } from "@csstools/convert-colors";
import { clamp, round } from "../math";

type LCH = {
  l: number;
  c: number;
  h: number;
  opacity: number;
};
type RGB = { r: number; g: number; b: number; opacity: number };

export function asPrettyHex({ r, g, b, opacity }: RGB) {
  const pad = (s: string) => (s.length === 1 ? "0" + s : s);
  return [
    "#",
    pad(round(r).toString(16)),
    pad(round(g).toString(16)),
    pad(round(b).toString(16)),
    opacity < 1 ? pad(round(opacity * 255).toString(16)) : ``,
  ].join("");
}

export function asPrettyHsl({ r, g, b, opacity }: RGB) {
  // Tried d3-color, but https://github.com/d3/d3-color/issues/83
  const [h, s, l] = rgb2hsl(r / 2.55, g / 2.55, b / 2.55);
  const hasAlpha = round(opacity) < 1;
  const res = [
    hasAlpha ? "hsla" : "hsl",
    `(`,
    `${round(h) % 360},`,
    ` ${round(clamp(s, 0, 100))}%,`,
    ` ${round(clamp(l, 0, 100))}%`,
    hasAlpha ? `, ${opacity}` : "",
    `)`,
  ].join("");
  return res;
}

export function asPrettyLch({ l, c, h, opacity }: LCH) {
  return [
    `lch(`,
    `${round(l)}%`,
    ` ${round(c)}`,
    ` ${round(h)}`,
    opacity < 1 ? ` / ${opacity}` : "",
    `)`,
  ].join("");
}

export function asPrettyRgb({ r, g, b, opacity }: RGB) {
  return [
    opacity < 1 ? `rgba(` : `rgb(`,
    `${round(r)}, ${round(g)}, ${round(b)}`,
    opacity < 1 ? `, ${opacity}` : ``,
    `)`,
  ].join("");
}
