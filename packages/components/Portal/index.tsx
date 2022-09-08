import React, {
  forwardRef,
  ReactNode,
  createContext,
  useContext,
  HtmlHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";

const ZIndexContext = createContext(0);

interface PortalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  host: Element;
  children?: ReactNode;
}
export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  (props, forwardedRef) => {
    const { host, style, ...rest } = props;
    const zIndex = useContext(ZIndexContext) + 1;
    return createPortal(
      <ZIndexContext.Provider value={zIndex}>
        <div ref={forwardedRef} style={{ zIndex, ...style }} {...rest} />
      </ZIndexContext.Provider>,
      host
    );
  }
);

Portal.displayName = "Portal";
