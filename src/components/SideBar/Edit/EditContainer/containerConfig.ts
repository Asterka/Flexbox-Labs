import { IconType } from "react-icons";
import { DiGhostSmall } from "react-icons/di";
import {
   LuAlignHorizontalJustifyStart,
   LuAlignVerticalDistributeEnd,
   LuAlignVerticalJustifyEnd,
   LuWrapText,
} from "react-icons/lu";
import { RxSpaceEvenlyHorizontally } from "react-icons/rx";
import { TbArrowsRightDown } from "react-icons/tb";
import { Container } from "../../../../context/PlaygroundContext";

type ContainerConfigBase = {
   key: keyof Container;
   title: string;
   description: string;
   icon: IconType;
   type: "select" | "input";
   defaultValue: string;
};

type SelectContainerConfig = ContainerConfigBase & {
   type: "select";
   options: string[];
};

type InputType =
   | { inputType: "unit"; unitOptions: string[] }
   | { inputType: "number"; step?: number };

type InputContainerConfig = ContainerConfigBase & InputType & {
   type: "input";
};

type ContainerConfig = SelectContainerConfig | InputContainerConfig;

export const configContainer: ContainerConfig[] = [
   {
      key: "display",
      title: "Display",
      description: "Sets the display type",
      icon: DiGhostSmall,
      type: "select",
      options: ["flex", "block"],
      defaultValue: "flex",
   },
   {
      key: "flexDirection",
      title: "Flex Direction",
      description: "Sets main axis direction",
      icon: TbArrowsRightDown,
      type: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
      defaultValue: "row",
   },
   {
      key: "flexWrap",
      title: "Flex Wrap",
      description: "Controls items wrapping",
      icon: LuWrapText,
      type: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
      defaultValue: "nowrap",
   },
   {
      key: "justifyContent",
      title: "Justify Content",
      description: "Aligns items on main axis",
      icon: LuAlignHorizontalJustifyStart,
      type: "select",
      options: [
         "start",
         "center",
         "end",
         "space-between",
         "space-around",
         "space-evenly",
      ],
      defaultValue: "start",
   },
   {
      key: "alignItems",
      title: "Align Items",
      description: "Aligns items on cross axis",
      icon: LuAlignVerticalJustifyEnd,
      type: "select",
      options: ["stretch", "start", "center", "end", "baseline"],
      defaultValue: "stretch",
   },
   {
      key: "alignContent",
      title: "Align Content",
      description: "Controls flex line spacing",
      icon: LuAlignVerticalDistributeEnd,
      type: "select",
      options: [
         "stretch",
         "start",
         "center",
         "end",
         "space-between",
         "space-around",
      ],
      defaultValue: "stretch",
   },
   {
      key: "gap",
      title: "Gap",
      description: "Sets gap between items",
      icon: RxSpaceEvenlyHorizontally,
      type: "input",
      defaultValue: "20px",
      inputType: "unit",
      unitOptions: ["px", "%"],
   },
];
