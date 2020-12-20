import { normal } from "color-blend";
import { parse } from "../formats";

type RGB = { r: number; g: number; b: number; opacity: number };

export function colorOnBackground(color: RGB, background: RGB): RGB {
  const { r, g, b, a } = normal(
    {
      r: background.r,
      g: background.g,
      b: background.b,
      a: background.opacity,
    },
    { r: color.r, g: color.g, b: color.b, a: color.opacity }
  );
  const parsed = parse(`rgba(${r}, ${g}, ${b}, ${a})`);
  if (typeof parsed === "object" && "r" in parsed && "opacity" in parsed)
    return parsed;
  console.error(parsed);
  throw new Error("Unexpected parsed");
}
