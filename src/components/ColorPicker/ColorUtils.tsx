import styled from "styled-components";

export const namedColors: Record<string, string> = {
  'red': '#ff0000',
};

export type ColorObject = { r?: number, g?: number, b?: number, h?: number, s?: number, v?: number, l?: number, a?: number, hex?: string };
export type RgbaObject = { r: number, g: number, b: number, a: number };
export type RgbObject = { r: number, g: number, b: number, a?: number };
export type HslaObject = { h: number, s: number, l: number, a: number };
export type HslObject = { h: number, s: number, l: number, a?: number };
export type HsvaObject = { h: number, s: number, v: number, a: number };
export type HsvObject = { h: number, s: number, v: number, a?: number };
export type HexObject = { hex: string }
export type ColorInputObject = ColorObject | RgbObject | HslObject | HsvObject | HexObject | string;

export const extractRgba = (rgb: [number, number, number, number | undefined]) => {
  let [r, g, b, a] = rgb;
  a ??= 1;
  return { r, g, b, a };
};

export const extractValues = (color: string): number[] => {
  if (color.startsWith('#')) {
    color = shortHandHexToFull(color);
    const hexValues = color.match(/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i);
    if (hexValues) {
      return hexValues.slice(1).map(hex => parseInt(hex, 16));
    }
  } else {
    const values = color.match(/-?[0-9]*\.?[0-9]+%?/g);
    if (values) {
      return values.map(value => value.endsWith('%') ? parseFloat(value) / 100 : Number(value));
    }
  }
  return [];
};

export const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

export const toFixed = (value: any, precision: number = 2): any => {
  if (typeof value === 'number') return parseFloat(value.toFixed(precision));

  if (typeof value === 'string') {
    const numberValue = parseFloat(value);
    return isNaN(numberValue) ? value : parseFloat(numberValue.toFixed(precision));
  }

  if (value === null || value === undefined || value === Infinity || value === -Infinity) return value;

  if (typeof value === 'object') {
    if (Array.isArray(value)) return value.map((v: any) => toFixed(v, precision));

    return Object.entries(value).reduce((acc, [key, val]) => {
      acc[key] = toFixed(val, precision);
      return acc;
    }, {} as any);
  }
};

// Expand shorthand hex form to full hex form
// 03F -> 0033FF
export const shortHandHexToFull = (hex: string) => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  if (!shorthandRegex.test(hex)) {
    return hex.toUpperCase();
  }
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  return ("#" + hex).toUpperCase();
};

// Convert a hex color (#FF0000) to RGB/RGBA (255, 0, 0, 1)
export const hex2Rgba = (hex: string): RgbaObject | null => {
  hex = shortHandHexToFull(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  let rgba;
  // has alpha
  if (result) {
    const alphaHex = result[4] ?? "ff";
    const alpha = parseInt(alphaHex, 16) / 255;
    rgba = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: alpha,
    };
  }
  // Fallback: Try to match without the alpha component
  const resultRGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (resultRGB) {
    rgba = {
      r: parseInt(resultRGB[1], 16),
      g: parseInt(resultRGB[2], 16),
      b: parseInt(resultRGB[3], 16),
      a: 1,
    };
  }
  // If we got here, the input wasn't a valid hex color string.
  return toFixed(rgba);
};

// Convert an RGB/RGBA (255, 0, 0, 1) color to hex (#FF0000FF)
export const rgba2Hex = (rgba: RgbaObject) => {
  let { r, g, b, a } = rgba;
  a ??= 1;
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  const alpha = Math.round(a * 255).toString(16).padStart(2, "0");
  return ("#" + hex + alpha).toUpperCase();
};

export const rgba2Hsva = (rgba: RgbaObject): HsvaObject => {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const a = rgba.a ?? 1;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const v = max;

  const diff = max - min;
  s = max === 0 ? 0 : diff / max;

  if (max === min) {
    h = 0; 
  } else {
    if (max === r) h = (g - b) / diff + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / diff + 2;
    if (max === b) h = (r - g) / diff + 4;
    h /= 6;
  }

  return toFixed({ h: h * 360, s: s * 100, v: v * 100, a });
};

export const hsva2Rgba = (hsva: HsvaObject): RgbaObject => {
  const h = hsva.h / 360;
  const s = hsva.s / 100;
  const v = hsva.v / 100;
  const a = hsva.a ?? 1;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  const rgbOrder = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q]
  ];

  let [r, g, b] = rgbOrder[i % 6];

  return toFixed({ r: r * 255, g: g * 255, b: b * 255, a: a });
};

export const hsva2Hsla = (hsva: HsvaObject): HslaObject => {
  const s = hsva.s / 100;
  const v = hsva.v / 100;
  const a = hsva.a ?? 1;

  let l = (2 - s) * v / 2;
  let newS = s;

  if (l !== 0) {
    if (l === 1) {
      newS = 0;
    } else if (l < 0.5) {
      newS = s * v / (l * 2);
    } else {
      newS = s * v / (2 - l * 2);
    }
  }

  return toFixed({ h: hsva.h, s: newS * 100, l: l * 100, a });
};

export const hsla2Hsva = (hsla: HslaObject): HsvaObject => {
  const s = hsla.s / 100;
  const l = hsla.l / 100;
  const a = hsla.a ?? 1;

  const v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
  let newS = (2 * (v - l)) / v;

  if (v === 0) {
    newS = 0;
  }

  return toFixed({ h: hsla.h, s: newS * 100, v: v * 100, a });
};

const stringToObject = (str: string): ColorObject | null => {
  let colorValues = extractValues(str);
  if (str.startsWith('#')) {
    // Hex color
    str = shortHandHexToFull(str);
    return { hex: str };
  }
  else if (str.startsWith('rgb')) {
    // Expect 3 or 4 values for RGB[A]
    if (colorValues.length !== 3 && colorValues.length !== 4) return null;
    const [r, g, b, a = 1] = colorValues;
    return { r, g, b, a };
  } 
  else if (str.startsWith('hsl')) {
    // Expect 3 or 4 values for HSL[A]
    if (colorValues.length !== 3 && colorValues.length !== 4) return null;
    const [h, s, l, a = 1] = colorValues;
    return { h, s, l, a };
  } 
  else if (str.startsWith('hsv')) {
    // Expect 3 or 4 values for HSV[A]
    if (colorValues.length !== 3 && colorValues.length !== 4) return null;
    const [h, s, v, a = 1] = colorValues;
    return { h, s, v, a };
  } 
  else {
    return null;
  }
};


export const toHsva = (color: ColorInputObject): HsvaObject => {
  let hsva: HsvaObject;
  if (typeof color === 'string') {
    if (color.startsWith('#')) {
      hsva = rgba2Hsva(hex2Rgba(color)!);
    } else {
      const colorObject = stringToObject(color);
      if (!colorObject) throw new Error(`Unrecognized string color input: "${color}"`);
      if (color.startsWith('rgb')) hsva = rgba2Hsva(colorObject as RgbaObject);
      else if (color.startsWith('hsl')) hsva = hsla2Hsva(colorObject as HslaObject);
      else if (color.startsWith('hsv')) hsva = { ...(colorObject as HsvObject), a: (colorObject as HsvObject).a ?? 1 };
      else throw new Error(`Unrecognized string color input: "${color}"`);
    }
  } 
  else if ('r' in color && 'g' in color && 'b' in color) hsva = rgba2Hsva(color as RgbaObject);
  else if ('h' in color && 's' in color && 'v' in color) hsva = { ...(color as HsvObject), a: (color as HsvObject).a ?? 1 };
  else if ('h' in color && 's' in color && 'l' in color) hsva = hsla2Hsva(color as HslaObject);
  else if ('hex' in color) hsva = rgba2Hsva(hex2Rgba(color.hex!)!);
  else throw new Error(`Missing required properties in object color input: ${JSON.stringify(color)}`);
    
  hsva.a = Math.max(0, Math.min(hsva.a, 1));
  return hsva;
}

export class Color {
  h: number;
  s: number;
  v: number;
  a: number;

  constructor(color: ColorInputObject) {
    const hsva = toHsva(color);
    this.h = hsva.h;
    this.s = hsva.s;
    this.v = hsva.v;
    this.a = hsva.a;
  }

  toRgba(): RgbaObject {
    return hsva2Rgba(this.toHsva());
  }

  toHsla(): HslObject {
    return hsva2Hsla(this.toHsva());
  }

  toHsva(): HsvaObject {
    return { h: this.h, s: this.s, v: this.v, a: this.a };
  }

  toHexString(): string {
    let { r, g, b, a }: RgbaObject = this.toRgba();
    return `#${((1 << 24) | ((r & 255) << 16) | ((g & 255) << 8) | (b & 255)).toString(16).slice(1)}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
  }
}

const assertEqual = (actual: any, expected: any, testName: any) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`Passed: ${testName}`);
  } else {
    console.log(`Failed: ${testName}. Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
  }
}

const colorTest = (input: any, expected: any, conversionFunc: any) => {
  const actual = conversionFunc(input);
  assertEqual(toFixed(actual), toFixed(expected), `colorTest: ${JSON.stringify(input)}`);
};

const runTests = () => {
  // Testing shortHandHexToFull
  colorTest('#03F', '#0033FF', shortHandHexToFull);
  colorTest('#abc', '#AABBCC', shortHandHexToFull);
  colorTest('#123', '#112233', shortHandHexToFull);

  // Testing hex2Rgba
  colorTest('#FF0000', {r: 255, g: 0, b: 0, a: 1}, hex2Rgba);
  colorTest('#0080FF80', {r: 0, g: 128, b: 255, a: 0.50}, hex2Rgba);
  colorTest('#12345678', {r: 18, g: 52, b: 86, a: 0.47}, hex2Rgba);

  // Testing rgba2Hex
  colorTest({r: 255, g: 0, b: 0}, '#FF0000FF', rgba2Hex);
  colorTest({r: 255, g: 0, b: 0, a: 1}, '#FF0000FF', rgba2Hex);
  colorTest({r: 0, g: 128, b: 255, a: 0.50}, '#0080FF80', rgba2Hex);
  colorTest({r: 18, g: 52, b: 86, a: 0.47}, '#12345678', rgba2Hex);

  // Testing rgba2Hsva
  colorTest({r: 255, g: 0, b: 0, a: 1}, {h: 0, s: 100, v: 100, a: 1}, rgba2Hsva);
  colorTest({r: 0, g: 128, b: 255, a: 0.50}, {h: 209.88, s: 100, v: 100, a: 0.50}, rgba2Hsva);
  colorTest({r: 18, g: 52, b: 86, a: 0.47}, {h: 210, s: 79.07, v: 33.73, a: 0.47}, rgba2Hsva);

  // Testing hsva2Rgba
  colorTest({h: 0, s: 100, v: 100, a: 1}, {r: 255, g: 0, b: 0, a: 1}, hsva2Rgba);
  colorTest({h: 210, s: 100, v: 100, a: 0.50}, {r: 0, g: 127.5, b: 255, a: 0.50}, hsva2Rgba);
  colorTest({h: 210, s: 79, v: 34, a: 0.47}, {r: 18.21, g: 52.45, b: 86.7, a: 0.47}, hsva2Rgba);

  // Testing hsva2Hsla
  colorTest({h: 0, s: 100, v: 100, a: 1}, {h: 0, s: 100, l: 50, a: 1}, hsva2Hsla);
  colorTest({h: 120, s: 100, v: 100, a: 1}, {h: 120, s: 100, l: 50, a: 1}, hsva2Hsla);
  colorTest({h: 240, s: 100, v: 100, a: 1}, {h: 240, s: 100, l: 50, a: 1}, hsva2Hsla);

  // Testing hsla2Hsva
  colorTest({h: 0, s: 100, l: 50, a: 1}, {h: 0, s: 100, v: 100, a: 1}, hsla2Hsva);
  colorTest({h: 120, s: 100, l: 50, a: 1}, {h: 120, s: 100, v: 100, a: 1}, hsla2Hsva);
  colorTest({h: 240, s: 100, l: 50, a: 1}, {h: 240, s: 100, v: 100, a: 1}, hsla2Hsva);
};

export enum Direction {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
};

export const BarOptions = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: auto;
  padding: 0;
  overflow: hidden;
`;

export const BarsWithResult = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 0;
  margin: 6px 0 6px 0;
`;

export const ColorResult = styled.div<{ color: string }>`
  width: 32px;
  height: 28px;
  border: 0.5px solid ${props => props.theme.border};
  margin-left: 6px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: 
      linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),
      linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${props => props.color};
  }
`;

export const Checkboard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: 
    linear-gradient(45deg, #999 25%, transparent 25%),
    linear-gradient(-45deg, #999 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #999 75%),
    linear-gradient(-45deg, transparent 75%, #999 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
`;