import { bem, Modifiers } from "@mizone/utils";
import { useContext } from "react";
import { ThemeContext } from "../../config-provider/themeContext";

export const useBem = () => {
  const { getPrefixCls } = useContext(ThemeContext);

  return (block: string, element?: string | Modifiers, modifiers?: Modifiers) =>
    getPrefixCls(bem(block, element, modifiers));
};
