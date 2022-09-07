import { cx } from "@mizone/utils";
import React, {
  forwardRef,
  ReactNode,
  createContext,
  useContext,
  HtmlHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { useBem } from "../utils/hooks/useBem";

const ZIndexContext = createContext(0);

interface PortalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  host: Element;
  children?: ReactNode;
}
export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  (props, forwardedRef) => {
    const { host, style, ...rest } = props;
    const zIndex = useContext(ZIndexContext) + 1;
    const bem = useBem();
    return createPortal(
      <ZIndexContext.Provider value={zIndex}>
        <div
          className={cx(bem("portal"))}
          ref={forwardedRef}
          style={{ zIndex, ...style }}
          {...rest}
        />
      </ZIndexContext.Provider>,
      host
    );
  }
);

Portal.displayName = "Portal";
