import { bem, Modifiers } from "@mizone/utils";
import { useContext } from "react";
import { styleContext } from "../../config-provider/styleContext";

export const useBem = () => {
  const { getPrefixCls } = useContext(styleContext);

  return (block: string, element?: string | Modifiers, modifiers?: Modifiers) =>
    getPrefixCls(bem(block, element, modifiers));
};
