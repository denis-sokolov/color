import test from "ava";
import { parse } from "./parse";

type Case = [string, any];

const cases: Case[] = [
  ["#f00", { r: 255, g: 0, b: 0, opacity: 1 }],
  ["#f00a", { r: 255, g: 0, b: 0, opacity: 2 / 3 }],

  ["hsl(187,68%,73%)", { h: 187, s: 0.68, l: 0.73, opacity: 1 }],
  ["hsl ( 187 ,  68 % ,  73 % )", { h: 187, s: 0.68, l: 0.73, opacity: 1 }],
  ["hsla(327,56%,32%,0.13)", { h: 327, s: 0.56, l: 0.32, opacity: 0.13 }],
  [
    "hsla ( 327 , 56 %  , 32  % ,  0.13 )",
    { h: 327, s: 0.56, l: 0.32, opacity: 0.13 },
  ],
  [
    "hsl ( 327 , 56 %  , 32  % ,  0.13 )",
    { h: 327, s: 0.56, l: 0.32, opacity: 0.13 },
  ],

  ["lch(83% 28 210)", { l: 83, c: 28, h: 210, opacity: 1 }],
  ["lch  (  83 %  28   210  )", { l: 83, c: 28, h: 210, opacity: 1 }],
  ["lch(31% 44 350 / 0.13)", { l: 31, c: 44, h: 350, opacity: 0.13 }],
  [
    "lch   (  31%   44   350  /  0.13 )",
    { l: 31, c: 44, h: 350, opacity: 0.13 },
  ],

  ["rgb(138, 221, 233)", { r: 138, g: 221, b: 233, opacity: 1 }],
  ["rgb  ( 138  , 221  , 233 ) ", { r: 138, g: 221, b: 233, opacity: 1 }],
  ["rgba(128, 36, 86, 0.13)", { r: 128, g: 36, b: 86, opacity: 0.13 }],
  [
    "rgba ( 128   ,  36  ,  86 ,   0.13  )",
    { r: 128, g: 36, b: 86, opacity: 0.13 },
  ],
  [
    "rgb ( 128   ,  36  ,  86 ,   0.13  )",
    { r: 128, g: 36, b: 86, opacity: 0.13 },
  ],
];

cases.forEach(([input, expected], i) => {
  test(`parse case ${i + 1}`, (t) => {
    const actual = parse(input);
    t.deepEqual(actual, expected);
  });
});

const keywordCases: [string, [number, number, number]][] = [
  ["cyan", [0, 255, 255]],
  ["orange", [255, 165, 0]],
  ["aliceblue", [240, 248, 255]],
  ["lightgoldenrodyellow", [250, 250, 210]],
  ["rebeccapurple", [102, 51, 153]],
];

const approxEq = (a: number, b: number) => Math.abs(a - b) < 0.000001;

keywordCases.forEach(([input, expectedTuple]) => {
  test(`parse keyword ${input}`, (t) => {
    const actual = parse(input) as {
      r: number;
      g: number;
      b: number;
      opacity: 1;
    };
    t.is(actual.opacity, 1);
    const expected = {
      r: expectedTuple[0],
      g: expectedTuple[1],
      b: expectedTuple[2],
      opacity: 1,
    };
    if (
      !approxEq(actual.r, expected.r) ||
      !approxEq(actual.g, expected.g) ||
      !approxEq(actual.b, expected.b)
    )
      t.deepEqual(actual, expected);
  });
});

test("parse transparent", (t) => {
  t.deepEqual(parse("transparent"), {
    r: 0,
    g: 0,
    b: 0,
    opacity: 0,
  });
});
