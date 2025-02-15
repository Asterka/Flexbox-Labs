import { CSSProperties } from "react";

const cssPrimeFlexMap: Record<string, Record<string, string>> = {
   display: {
      flex: "flex",
      "inline-flex": "inline-flex",
      block: "block",
      "inline-block": "inline-block",
      grid: "grid",
      none: "hidden",
   },
   flexDirection: {
      row: "flex-row",
      column: "flex-columm",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-column-reverse",
   },
   flexWrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
   },
   justifyContent: {
      "flex-start": "justify-content-start",
      start: "justify-content-start",
      "flex-end": "justify-content-end",
      end: "justify-content-end",
      center: "justify-content-center",
      "space-between": "justify-content-between",
      "space-around": "justify-content-around",
      "space-evenly": "justify-content-evenly",
   },
   alignItems: {
      "flex-start": "align-items-start",
      start: "align-items-start",
      "flex-end": "align-items-end",
      end: "align-items-end",
      center: "align-items-center",
      baseline: "align-items-baseline",
      stretch: "align-items-stretch",
   },
   alignContent: {
      "flex-start": "align-content-start",
      start: "align-content-start",
      "flex-end": "align-content-end",
      end: "align-content-end",
      center: "align-content-center",
      "space-between": "align-content-between",
      "space-around": "align-content-around",
      stretch: "align-content-stretch",
   },
   alignSelf: {
      auto: "align-self-auto",
      "flex-start": "align-self-start",
      start: "align-self-start",
      "flex-end": "align-self-end",
      end: "align-self-end",
      center: "align-self-center",
      stretch: "align-self-stretch",
   },
   justifySelf: {
      auto: "justify-self-auto",
      start: "justify-self-start",
      end: "justify-self-end",
      center: "justify-self-center",
      stretch: "justify-self-stretch",
   },
   flexGrow: {
      "0": "flex flex-grow-0",
      "1": "flex flex-grow-1",
   },
   flexShrink: {
      "0": "flex-shrink-0",
      "1": "flex-shrink-1",
   },
   flexBasis: {
      auto: "flex-initial",
      "100%": "flex-1",
   },
   order: {
      "0": "flex-order-0",
      "1": "flex-order-1",
      "2": "flex-order-2",
      "3": "flex-order-3",
      "4": "flex-order-4",
      "5": "flex-order-5",
      "6": "flex-order-6",
      "7": "flex-order-7",
      "8": "flex-order-8",
      "9": "flex-order-9",
      "10": "flex-order-10",
      "11": "flex-order-11",
      "12": "flex-order-12",
      "-1": "flex-order-first",
      "9999": "flex-order-last",
   },
   gridAutoFlow: {
      row: "grid-flow-row",
      column: "grid-flow-col",
      "row dense": "grid-flow-row-dense",
      "column dense": "grid-flow-col-dense",
   },
   justifyItems: {
      start: "justify-items-start",
      end: "justify-items-end",
      center: "justify-items-center",
      stretch: "justify-items-stretch",
   },
};

const gapMap: Record<string, string> = {
   "0px": "gap-0",
   "0.25rem": "gap-1",
   "0.5rem": "gap-2",
   "0.75rem": "gap-3",
   "1rem": "gap-4",
   "1.25rem": "gap-5",
   "1.5rem": "gap-6",
   "2rem": "gap-8",
   "2.5rem": "gap-10",
   "3rem": "gap-12",
};

const sizeMap: Record<string, string> = {
   "0px": "w-min",
   "100%": "w-full",
   "100vh": "h-screen",
   "100vw": "w-screen",
   auto: "w-auto",
};

function convertSize(value: string, property: "width" | "height"): string {
   const prefix = property === "width" ? "w" : "h";
   if (sizeMap[value]) return sizeMap[value];
   if (value.endsWith("px")) {
      const numValue = parseInt(value);
      if (numValue % 4 === 0) return `${prefix}-${numValue / 4}`;
   }
   if (value.endsWith("%")) {
      const numValue = parseInt(value);
      if (numValue % 25 === 0) return `${prefix}-${numValue / 25}/4`;
   }
   return `${prefix}-[${value}]`;
}

function convertGridTemplate(value: string, isColumns: boolean): string {
   if (value === "none") return isColumns ? "grid-cols-none" : "grid-rows-none";
   if (value === "subgrid")
      return isColumns ? "grid-cols-subgrid" : "grid-rows-subgrid";
   const optimizedValue = optimizeRepeatedValues(value).replace(/ /g, "_");
   return isColumns
      ? `grid-cols-[${optimizedValue}]`
      : `grid-rows-[${optimizedValue}]`;
}

function optimizeRepeatedValues(value: string): string {
   const parts = value.split(" ");
   let optimized = "";
   let count = 1;

   for (let i = 0; i < parts.length; i++) {
      if (parts[i] === parts[i + 1]) {
         count++;
      } else {
         optimized +=
            count > 1 ? `repeat(${count},${parts[i]})_` : `${parts[i]}_`;
         count = 1;
      }
   }

   return optimized.slice(0, -1); // Remove the trailing underscore
}

/**
 * Convert basic gap value to PrimeFlex-compatible string
 * @param value 
 * @returns 
 */
function convertGap(value: string): string {
   const values = value.split(" ");
   if (values.length === 1) {
      // В прайме нет классов gap-[Npx], нужно доделать
      // `gap-[${value}]`
      return gapMap[value] || `gap-3`;
   } else if (values.length === 2) {
      const [y, x] = values;
      const yGap = gapMap[y] ? gapMap[y].replace("gap-", "") : `[${y}]`;
      const xGap = gapMap[x] ? gapMap[x].replace("gap-", "") : `[${x}]`;
      return `gap-y-${yGap} gap-x-${xGap}`;
   }
   return `gap-[${value}]`;
}

function convertGridArea(value: string): {
   gridRowStart?: string;
   gridRowEnd?: string;
   gridColumnStart?: string;
   gridColumnEnd?: string;
} {
   const parts = value.split("/").map((part) => part.trim());
   if (parts.length === 4) {
      return {
         gridRowStart: parts[0],
         gridColumnStart: parts[1],
         gridRowEnd: parts[2],
         gridColumnEnd: parts[3],
      };
   } else if (parts.length === 3) {
      return {
         gridRowStart: parts[0],
         gridColumnStart: parts[1],
         gridRowEnd: parts[2],
         gridColumnEnd: parts[1],
      };
   } else if (parts.length === 2) {
      return {
         gridRowStart: parts[0],
         gridColumnStart: parts[1],
         gridRowEnd: parts[0],
         gridColumnEnd: parts[1],
      };
   } else {
      return {
         gridRowStart: value,
         gridColumnStart: value,
         gridRowEnd: value,
         gridColumnEnd: value,
      };
   }
}

function convertGridItemProperty(property: string, value: string): string {
   const numValue = parseInt(value);
   if (!isNaN(numValue)) {
      return `${property}-${numValue}`;
   } else if (value === "auto") {
      return `${property}-auto`;
   } else if (value === "span") {
      return `${property}-span-full`;
   } else if (value.startsWith("span ")) {
      const spanValue = value.split(" ")[1];
      return `${property}-span-${spanValue}`;
   } else if (value.includes("/")) {
      return `${property}-[${value.replace(/ /g, "_")}]`;
   } else {
      return `${property}-[${value}]`;
   }
}

export function convertCssToPrimeFlex(cssObject: CSSProperties): string {
   const PrimeFlexClasses: string[] = [];

   Object.entries(cssObject).forEach(([key, value]) => {
      const stringValue = value.toString();
      const camelCaseKey = key.replace(/-./g, (x) => x[1].toUpperCase());
      const IS_STATIC_PROPERTY = cssPrimeFlexMap[camelCaseKey] && cssPrimeFlexMap[camelCaseKey][stringValue]
      let property;
      let parts;

      if (
         IS_STATIC_PROPERTY
      ) {
         PrimeFlexClasses.push(cssPrimeFlexMap[camelCaseKey][stringValue]);
         return;
      } else {
         switch (camelCaseKey) {
            case "gap":
               PrimeFlexClasses.push(convertGap(stringValue));
               break;
            case "width":
               PrimeFlexClasses.push(convertSize(stringValue, "width"));
               break;
            case "height":
               PrimeFlexClasses.push(convertSize(stringValue, "height"));
               break;
            case "order":
               PrimeFlexClasses.push(
                  cssPrimeFlexMap.order[stringValue] || `order-[${stringValue}]`
               );
               break;
            case "flexGrow":
               PrimeFlexClasses.push("flex");
               if (stringValue === "0") {
                  PrimeFlexClasses.push("flex-grow-0");
               } else if (stringValue === "1") {
                  PrimeFlexClasses.push("flex-grow-1");
               } else {
                  // В прайме нет классов flex-grow-[N], нужно доделать
                  // тут было flex-grow-[${stringValue}]
                  PrimeFlexClasses.push(`flex-grow-1`);
               }
               break;
            case "flexShrink":
               if (stringValue === "0") {
                  PrimeFlexClasses.push("shrink-0");
               } else if (stringValue === "1") {
                  PrimeFlexClasses.push("shrink");
               } else {
                  PrimeFlexClasses.push(`shrink-[${stringValue}]`);
               }
               break;
            case "flexBasis":
               if (cssPrimeFlexMap.flexBasis[stringValue]) {
                  PrimeFlexClasses.push(cssPrimeFlexMap.flexBasis[stringValue]);
               } else {
                  PrimeFlexClasses.push(`basis-[${stringValue}]`);
               }
               break;
            case "gridtemplateColumns":
               PrimeFlexClasses.push(convertGridTemplate(stringValue, true));
               break;
            case "gridtemplateRows":
               PrimeFlexClasses.push(convertGridTemplate(stringValue, false));
               break;
            case "gridAutoColumns":
               PrimeFlexClasses.push(`auto-cols-[${stringValue}]`);
               break;
            case "gridAutoRows":
               PrimeFlexClasses.push(`auto-rows-[${stringValue}]`);
               break;
            case "gridArea":
               const { gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd } =
                  convertGridArea(stringValue);

               if (gridRowStart)
                  PrimeFlexClasses.push(convertGridItemProperty("row", gridRowStart));
               if (gridRowEnd)
                  PrimeFlexClasses.push(convertGridItemProperty("row", gridRowEnd));
               if (gridColumnStart)
                  PrimeFlexClasses.push(
                     convertGridItemProperty("col", gridColumnStart)
                  );
               if (gridColumnEnd)
                  PrimeFlexClasses.push(convertGridItemProperty("col", gridColumnEnd));
               break;
            case "gridRow":
               property = "row";
               parts = stringValue
                  .split("/")
                  .map((part: string) => part.trim());
               if (parts.length === 2) {
                  PrimeFlexClasses.push(convertGridItemProperty(property, parts[0]));
                  PrimeFlexClasses.push(convertGridItemProperty(property, parts[1]));
               } else {
                  PrimeFlexClasses.push(
                     convertGridItemProperty(property, stringValue)
                  );
               }
               break;
            case "gridColumn":
               property = "col";
               parts = stringValue
                  .split("/")
                  .map((part: string) => part.trim());
               if (parts.length === 2) {
                  PrimeFlexClasses.push(convertGridItemProperty(property, parts[0]));
                  PrimeFlexClasses.push(convertGridItemProperty(property, parts[1]));
               } else {
                  PrimeFlexClasses.push(
                     convertGridItemProperty(property, stringValue)
                  );
               }
               break;
            case "gridColumnEnd":
               PrimeFlexClasses.push(convertGridItemProperty("col", value));
               break;
            case "justifySelf":
               PrimeFlexClasses.push(
                  cssPrimeFlexMap.justifySelf[stringValue] ||
                  `justify-self-[${stringValue}]`
               );
               break;
            case "flex":
               const flexValues: string[] = stringValue.split(" ");

               if (flexValues.length === 1) {
                  PrimeFlexClasses.push(`flex-[${stringValue}]`);
               } else {
                  flexValues.forEach((flexValue, index) => {
                     if (index === 0)
                        PrimeFlexClasses.push(
                           flexValue === "1" ? "flex" : `flex-[${flexValue}]`
                        );
                     if (index === 1)
                        PrimeFlexClasses.push(
                           flexValue === "1" ? "flex-shrink" : `flex-shrink-[${flexValue}]`
                        );
                     if (index === 2) {
                        if (flexValue === "auto") {
                           PrimeFlexClasses.push("basis-auto");
                        } else if (flexValue === "100%") {
                           PrimeFlexClasses.push("basis-full");
                        } else {
                           PrimeFlexClasses.push(`basis-[${flexValue}]`);
                        }
                     }
                  });
               }
               break;
            default:
               console.warn(
                  `No PrimeFlex equivalent found for CSS property: ${key}: ${value}`
               );
               break;
         }
      }

   });

   return PrimeFlexClasses.join(" ");
}
