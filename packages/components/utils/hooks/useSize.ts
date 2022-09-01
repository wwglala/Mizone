import { useContext } from "react";
import { SizeContext, SizeType } from "../../config-provider/sizeContext";

export const useSize = (outSize: SizeType | undefined) => {
  const size = useContext(SizeContext);
  return outSize || size;
};
