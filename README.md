# Colors in UIs

Color manipulation for use in consistent design systems. Uses HCL color space for computation, but allows simple format input and output.

Read the awesome Lea Verou’s [blog post about HCL colors](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/).

```ts
import { colorFromString } from "ui-colors";

const themeColorCode = "#9973ba";
const themeColor = colorFromString(themeColorCode);

const text = themeColor.lightness > 50 ? "black" : "white";

const dark = themeColor.withLightness(30).asCss();
const light = themeColor.withLightness(80).asCss();
```

Beware of various number scales:

- Hue is 0-359;
- Red, green, blue components are 0-255;
- Opacity, HSL saturation and lightness are 0-1;
- Main lightness is 0 to 100 in practice, but is [unbounded in theory](https://www.w3.org/TR/css-color-4/#specifying-lab-lch)
- Chroma is 0 to about 130 in practice, but is unbounded;

## Constructors

Simple: colorFromHex("#aabbcc"), colorFromLch(70, 12, 350), colorFromHsl(350, 0.2, 0.8), colorFromRgb(120, 120, 120). Opacity is an optional last argument.

Smart constructor tries to parse the string as any format it can think of: colorFromString("...").

## Fields

color.chroma, color.hue, color.lightness, color.opacity, color.rgb.approximation

## Manipulation

color.withChroma(12), color.withHue(350), color.withLightness(70)

## Display

color.asPrettyLch()

color.asCss().approximation, color.asPrettyHex().approximation, color.asPrettyHsl().approximation, color.asPrettyRgb().approximation
