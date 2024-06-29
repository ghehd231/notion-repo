export type BreakpointsKey = "xs" | "sm" | "md" | "lg" | "xl";
export type BreakpointsValue = Record<BreakpointsKey, number>;

export type Breakpoints = {
  values: (key: BreakpointsKey) => number;
  up: (key: BreakpointsKey) => string;
  down: (key: Omit<BreakpointsKey, "xs">) => string;
  only: (key: BreakpointsKey) => string;
  not: (key: BreakpointsKey) => string;
  between: (start: BreakpointsKey, end: BreakpointsKey) => string;
  landscape: () => string;
  portrait: () => string;
};

export const breakpointsValue: BreakpointsValue = {
  xs: 768,
  sm: 1024,
  md: 1200,
  lg: 1440,
  xl: 1920,
};

const valueList = Object.values(breakpointsValue);

const breakpoints: Breakpoints = {} as Breakpoints;

breakpoints.values = (key: BreakpointsKey) => breakpointsValue[key];

breakpoints.up = (key: BreakpointsKey) =>
  `@media (min-width: ${breakpointsValue[key]}px)`;

breakpoints.down = (key: Omit<BreakpointsKey, "xs">) =>
  `@media (max-width: ${breakpointsValue[key as BreakpointsKey] - 1}px)`;

breakpoints.only = (key: BreakpointsKey) => {
  if (key === "xl") {
    return breakpoints.up(key);
  }

  const keyIndex = ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(key);

  return `@media (min-width: ${valueList[keyIndex]}px) and (max-width: ${
    valueList[keyIndex + 1] - 1
  }px)`;
};

breakpoints.not = (key: BreakpointsKey) => {
  if (key === "xs") {
    return breakpoints.up("sm");
  }
  if (key === "xl") {
    return breakpoints.down(key);
  }

  const keyIndex = ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(key);

  return `@media (min-width: ${valueList[keyIndex + 1]}px) and (max-width: ${
    valueList[keyIndex] - 1
  }px)`;
};

breakpoints.between = (start: BreakpointsKey, end: BreakpointsKey) => {
  const endIndex = ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(end);
  const startIndex = ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(start);

  return `@media (min-width: ${valueList[startIndex]}px) and (max-width: ${
    valueList[endIndex] - 1
  }px)`;
};

breakpoints.landscape = () => "@media (orientation: landscape)";

breakpoints.portrait = () => "@media (orientation: portrait)";

export default breakpoints;
