export * from "./imprecise";

export function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(max, number));
}

export function normalizeHue(h: number) {
  h = h % 360;
  if (h < 0) h = (360 + h) % 360;
  return h;
}

export function round(number: number) {
  const coef = 1;
  return Math.round(number * coef) / coef;
}
