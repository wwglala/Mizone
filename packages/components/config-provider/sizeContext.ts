import { createContext } from "react";

export type SizeType = "small" | "middle" | "large" | "stretch";

export const SizeContext = createContext<SizeType>("stretch");
