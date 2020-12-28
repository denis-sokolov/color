import test from "ava";
import { HCLSpaceColor } from "./class";
import { colorFromRgb } from "./constructors";

test("class exposes precise rgb for colors in rgb space", (t) => {
  const color = new HCLSpaceColor({ l: 63, c: 51, h: 305, opacity: 1 });
  t.truthy(color.rgb.precise);
});

test("class exposes precise rgb for colors built from rgb", (t) => {
  const color = colorFromRgb(175, 135, 228);
  t.truthy(color.rgb.precise);
});

test.skip("rgb property keeps full precision when constructed from rgb", (t) => {
  const color = colorFromRgb(175, 135, 228);
  t.is(color.rgb.precise?.r, 175);
  t.is(color.rgb.precise?.g, 135);
  t.is(color.rgb.precise?.b, 228);
});
