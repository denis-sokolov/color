type RGB = { r: number; g: number; b: number; opacity: number };

export function asCss({ r, g, b, opacity }: RGB) {
  return [
    opacity < 1 ? `rgba(` : `rgb(`,
    `${r}, ${g}, ${b}`,
    opacity < 1 ? `, ${opacity}` : ``,
    `)`,
  ].join("");
}
