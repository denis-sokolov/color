import { closestRgb } from "./closestRgb";
import {
  asCss,
  asPrettyHex,
  asPrettyHsl,
  asPrettyLch,
  asPrettyRgb,
} from "../formats";
import { Imprecise, makeApproximate, makePrecise, normalizeHue } from "../math";

export class HCLSpaceColor {
  /**
   * 0 to 100-130 (in theory to infinity)
   */
  public readonly lightness: number;

  /**
   * 0 to 110-150 (in theory to infinity)
   */

  public readonly chroma: number;

  /**
   * 0-359
   */
  public readonly hue: number;

  /**
   * 0-1
   */
  public readonly opacity: number;

  /**
   * 0-255
   */
  public readonly rgb: Imprecise<{ r: number; g: number; b: number }>;

  constructor(params: { l: number; c: number; h: number; opacity: number }) {
    if (params.l < 0) throw new Error(`Unexpected lightness ${params.l}`);
    if (params.c < 0) throw new Error(`Unexpected chroma ${params.c}`);

    this.lightness = params.l;
    this.chroma = params.c;
    this.hue = normalizeHue(params.h);
    this.opacity = params.opacity;

    const t = closestRgb(this.lightness, this.chroma, this.hue);
    this.rgb =
      t.chromaAdjustment === 0
        ? makePrecise({ r: t.r, g: t.g, b: t.b })
        : makeApproximate({ r: t.r, g: t.g, b: t.b });
  }

  public asCss() {
    return this.rgb.map((rgb) => asCss({ ...rgb, opacity: this.opacity }));
  }

  public asPrettyHex() {
    return this.rgb.map((rgb) =>
      asPrettyHex({ ...rgb, opacity: this.opacity })
    );
  }

  public asPrettyLch() {
    return asPrettyLch({
      l: this.lightness,
      c: this.chroma,
      h: this.hue,
      opacity: this.opacity,
    });
  }

  public asPrettyHsl() {
    return this.rgb.map((rgb) =>
      asPrettyHsl({ ...rgb, opacity: this.opacity })
    );
  }

  public asPrettyRgb() {
    return this.rgb.map((rgb) =>
      asPrettyRgb({ ...rgb, opacity: this.opacity })
    );
  }

  public withChroma(chroma: number) {
    return new HCLSpaceColor({
      c: chroma,
      h: this.hue,
      l: this.lightness,
      opacity: this.opacity,
    });
  }

  public withHue(hue: number) {
    return new HCLSpaceColor({
      c: this.chroma,
      h: hue,
      l: this.lightness,
      opacity: this.opacity,
    });
  }

  public withLightness(lightness: number) {
    return new HCLSpaceColor({
      c: this.chroma,
      h: this.hue,
      l: lightness,
      opacity: this.opacity,
    });
  }
}
