import { ClassValue, clsx } from "clsx";
// import {
//   differenceInDays,
//   differenceInMonths,
//   differenceInSeconds,
//   parseISO,
// } from "date-fns";

import { twMerge } from "tailwind-merge";

// import { breakpointsValue } from "@/styles/breakpoints";

// export const addressRegex = /^0x[a-fA-F0-9]{40}/;

// /**
//  * @description Ethereum 계정 주소를 짧게 만들어 줍니다
//  * @param {string} account 계정 주소
//  * @param {Object} options 주소의 시작 길이, 끝 길이를 정할 때 지정
//  */
// export const shortenAddress = (
//   account: `0x${string}`,
//   {
//     headLength = 8,
//     tailLength = 10,
//   }: { headLength?: number; tailLength?: number } = {}
// ) =>
//   `${account.substring(0, headLength + 2)}...${account.substring(
//     42 - tailLength
//   )}`;

// export const replacer = (key: string, value: unknown) =>
//   typeof value === "bigint" ? value.toString() : value;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// /**
//  * @description breakpoint의 미디어 쿼리 조건만 반환합니다(useMedia에서 사용)
//  * @param mediaQuery 미디어 쿼리
//  */
export const getBreakpointQuery = (mediaQuery: string): string =>
  mediaQuery.replace(/@media /, "");

export function createPortalRoot(id: string): HTMLDivElement {
  const root = document.createElement("div");
  root.setAttribute("id", id);

  return root;
}

// /**
//  * @description 현재 window의 크기에 해당하는 breakpoint의 미디어 쿼리 key 값을 반환합니다 (return: xl, lg, md, ... )
//  */
// export const getBreakpointKey = () => {
//   const sortedBreakpoints = Object.entries(breakpointsValue).sort(
//     (a, b) => a[1] - b[1]
//   );
//   return (): string => {
//     for (let i = sortedBreakpoints.length - 1; i >= 0; i -= 1) {
//       const [key, value] = sortedBreakpoints[i];
//       if (window.matchMedia(`(min-width: ${value}px)`).matches) {
//         return key;
//       }
//     }
//     return "default";
//   };
// };

// /**
//  * @description 1,000단위 콤마
//  * @param num
//  * @param maximumFractionDigits
//  */
// export const setComma = (num: number, maximumFractionDigits?: number): string =>
//   num.toLocaleString(undefined, {
//     maximumFractionDigits: maximumFractionDigits ?? 2,
//   });

// /**
//  *
//  * @description 남은 날 수 계산
//  * @param endDate
//  * @param startDate
//  * @returns num
//  */
// export const getDifferenceInDays = (endDate: string, startDate?: string) => {
//   const now = parseISO(startDate ?? new Date().toISOString());
//   const endDateTime = parseISO(endDate);
//   return differenceInDays(endDateTime, now);
// };

// /**
//  * @description 현재 시간과 특정 시간의 차이를 반환합니다.
//  * @param {number} firstTime
//  * @param {number} secondTime
//  * @returns
//  */
// export const getTimeDifference = (firstTime: number, secondTime: number) => {
//   const currentDate = new Date(firstTime);
//   const targetTime = new Date(secondTime);

//   const secondsDiff = Math.abs(differenceInSeconds(currentDate, targetTime));
//   const minutesDiff = Math.floor(secondsDiff / 60);
//   const hoursDiff = Math.floor(minutesDiff / 60);
//   const daysDiff = Math.floor(hoursDiff / 24);
//   const monthDiff = Math.abs(differenceInMonths(currentDate, targetTime));
//   const yearsDiff = Math.floor(daysDiff / 365);

//   if (secondsDiff < 60)
//     return `${secondsDiff} sec${secondsDiff > 1 ? "s" : ""} ago`;
//   if (minutesDiff < 60)
//     return `${minutesDiff} min${minutesDiff > 1 ? "s" : ""} ago`;
//   if (hoursDiff < 24) return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
//   if (daysDiff < 30) return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
//   if (monthDiff < 12)
//     return `${Math.abs(monthDiff)} month${monthDiff > 1 ? "s" : ""} ago`;
//   return `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
// };

// /**
//  * @description 첫글자는 대문자, 나머지는 소문자로 치환, _와 -를 띄어쓰기(' ')로 치환해줍니다
//  * @param {string} str
//  * @returns string
//  */
// export const capitalizeFirstLetter = (str: string) =>
//   str.replace(/[_-]/g, " ").charAt(0).toUpperCase() +
//   str.replace(/[_-]/g, " ").slice(1).toLowerCase();

// export const getMarketImage = (market: string) => {
//   const marketList = [
//     "opensea",
//     "blur",
//     "magic eden",
//     "playdapp market",
//     "opensea pro",
//     "foundation",
//     "looksrare",
//     "element",
//   ];
//   const marketName = market.toLowerCase();
//   const imageName = marketList.includes(marketName) ? marketName : "etc";
//   return `https://resources.playdapp.com/marketplace/v3/market/${imageName}.svg?format=svg`;
// };

// /**
//  * @description 주어진 숫자를 k, M, B 단위로 변환하여 반환합니다.
//  * @param {number} num - 변환할 숫자
//  * @returns {string}
//  */
// export const formatNumberWithSuffix = (
//   num: number,
//   fractionDigits?: number
// ): string => {
//   if (num >= 1_000_000_000) {
//     return " > 1B";
//   }
//   if (num >= 1_000_000) {
//     return `${(num / 1_000_000).toFixed(fractionDigits ?? 1)}M`;
//   }
//   if (num >= 1_000) {
//     return `${(num / 1_000).toFixed(fractionDigits ?? 1)}K`;
//   }
//   return num.toString();
// };

// /**
//  * @description ipfs://로 된 문자열을 https://ipfs.io/ipfs/ 로 변경합니다
//  * @param {str} str - 변환할 이미지 uri
//  * @returns {string}
//  */
// export const replaceIpfsToHttp = (str: string): string => {
//   const ipfsRegex = /ipfs:\/\/[a-zA-Z0-9]+\/?[a-zA-Z0-9\\/\\.\-\\_~]*$/;
//   let validImage = str;
//   if (ipfsRegex.test(str)) {
//     validImage = validImage.replace("ipfs://", "https://ipfs.io/ipfs/");
//   }
//   return validImage;
// };

// /**
//  * @description 대소문자 상관없이 문자열이 같은지 비교합니다
//  * @param {string} a
//  * @param {string} b
//  * @return boolean
//  */
// export const isEqualString = (a: string, b: string) =>
//   a.toLowerCase() === b.toLowerCase();

// /**
//  * @description 문자열이 json.parse를 실행한 이후 배열인지 여부를 체크합니다
//  * @param {string} data
//  * @returns boolean
//  */
// export const isJsonArray = (data: string) => {
//   try {
//     return Array.isArray(JSON.parse(data));
//   } catch {
//     return false;
//   }
// };
