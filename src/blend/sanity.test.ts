import test from "ava";
import { colorOnBackground } from ".";
type Case = [
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number]
];

const cases: Case[] = [
  [
    // Solid red on anybackground stays
    [255, 0, 0, 1],
    [100, 200, 300, 1],
    [255, 0, 0, 1],
  ],
  [
    // Solid red and blue is purple
    [255, 0, 0, 0.5],
    [0, 0, 255, 1],
    [128, 0, 128, 1],
  ],
  [
    // Random halfway
    [24, 41, 43, 0.5],
    [125, 0, 0, 1],
    [75, 21, 22, 1],
  ],
  [
    // color-blend logo
    [70, 217, 98, 0.6],
    [255, 0, 87, 0.42],
    [110, 170, 96, 0.768],
  ],
];

cases.forEach(([color, bg, expected], i) => {
  test(`colorOnBackground case ${i + 1}`, (t) => {
    const actual = colorOnBackground(
      {
        r: color[0],
        g: color[1],
        b: color[2],
        opacity: color[3],
      },
      { r: bg[0], g: bg[1], b: bg[2], opacity: bg[3] }
    );
    t.deepEqual(actual, {
      r: expected[0],
      g: expected[1],
      b: expected[2],
      opacity: expected[3],
    });
  });
});
