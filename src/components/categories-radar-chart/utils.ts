export const polarToX = (angle: number, distance: number): number =>
  Math.cos(angle - Math.PI / 2) * distance;

export const polarToY = (angle: number, distance: number): number =>
  Math.sin(angle - Math.PI / 2) * distance;
