// src/utils/utopia.js

/**
 * Generate a Utopia fluid type scale.
 *
 * Based on https://utopia.fyi/type/calculator/
 * by James Gilyead & Trys Mudford
 */

export function generateUtopiaScale({
  minViewport = 360,
  maxViewport = 1280,
  minFont = 16,
  maxFont = 20,
  scaleMin = 1.2,
  scaleMax = 1.25,
  steps = [-2, -1, 0, 1, 2, 3, 4],
} = {}) {
  const results: Record<number, string> = {};

  steps.forEach((step) => {
    const minSize = minFont * scaleMin ** step;
    const maxSize = maxFont * scaleMax ** step;

    const slope = ((maxSize - minSize) / (maxViewport - minViewport)) * 100;
    const intercept = minSize - (slope / 100) * minViewport;

    const clampValue = `clamp(${minSize / 16}rem, ${
      intercept / 16
    }rem + ${slope}vw, ${maxSize / 16}rem)`;

    results[step] = clampValue;
  });

  return results;
}
