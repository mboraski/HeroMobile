/**
 * on iphone 6 plus em should be:
 * em(0.0625) = 1
 * em(0.125) = 2
 * em(0.25) = 4
 * em(1) = 16
 */

import Dimensions from '../constants/Dimensions';

// Precalculate Device Dimensions for better performance
const width = Dimensions.window.width;
const height = Dimensions.window.height;

// Calculating ratio
let ratioX = 1;
let ratioY = 1;

// iPhone 6 Plus Dimensions as the baseline
// calculate ratio instead of using a predetermined ratio
if (width < 414) {
    ratioX = width / 736;
}
if (height < 736) {
    ratioY = height / 736;
}

// We set our base font size value
const baseUnit = 16;

// We're simulating EM by changing font size according to Ratio
const unitX = baseUnit * ratioX;
const unitY = baseUnit * ratioY;

// We add an em() shortcut function
export function emX(value) {
    return unitX * value;
}
export function emY(value) {
    return unitY * value;
}
