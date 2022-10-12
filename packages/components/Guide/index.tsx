import { cx } from "@mizone/utils";
import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useBem } from "../utils/hooks";

interface StepProps {
  selector: string;
  content: JSX.Element & ReactNode;
}

export class Guide {
  private maskDOM: HTMLDivElement;

  private startIndex: number;

  constructor(private steps: StepProps[]) {
    this.startIndex = 0;
    this.maskDOM = document.createElement("div");
    document.body.append(this.maskDOM);
  }

  animateScrollViewInto(anchor: HTMLDivElement) {
    return new Promise((resolve) => {
      let beforePos = 0;
      let recordCount = 0;
      anchor.scrollIntoView({ block: "center", behavior: "smooth" });
      requestAnimationFrame(check);
      function check() {
        const { top } = anchor.getBoundingClientRect();
        if (top === beforePos) {
          recordCount++;
        } else {
          recordCount = 0;
          beforePos = top;
        }
        if (recordCount >= 2) {
          return resolve(null);
        }
        requestAnimationFrame(check);
      }
    });
  }

  mask(
    anchor: HTMLDivElement,
    cloneAnchor: HTMLDivElement,
    content: ReactNode
  ) {
    const rect = anchor.getBoundingClientRect();
    ReactDOM.unmountComponentAtNode(this.maskDOM);

    ReactDOM.render(
      <App
        rect={rect}
        anchor={anchor}
        cloneAnchor={cloneAnchor}
        content={content}
        root={this.maskDOM}
        next={() => this.next()}
        pre={() => this.pre()}
      />,
      this.maskDOM
    );
  }

  next() {
    this.startIndex += 1;
    if (this.startIndex >= this.steps.length) this.startIndex = 0;
    this.start();
  }

  pre() {
    this.startIndex -= 1;
    if (this.startIndex < 0) this.startIndex = this.steps.length - 1;
    this.start();
  }

  onResize() {
    window.addEventListener("resize", () => {
      this.start();
    });
  }

  async start() {
    if (
      this.steps.length === 0 ||
      this.startIndex >= this.steps.length ||
      this.startIndex < 0
    )
      return;
    const { selector, content } = this.steps[this.startIndex]!;
    const anchor = document.querySelector<HTMLDivElement>(selector);
    if (!anchor) {
      throw new Error(`cant find dom ${selector}`);
    }
    await this.animateScrollViewInto(anchor);
    const cloneAnchor = anchor.cloneNode(true) as HTMLDivElement;
    cloneAnchor.style.position = "relative";
    cloneAnchor.style.left = "0px";
    cloneAnchor.style.top = "0px";

    this.mask(anchor, cloneAnchor, content);
  }
}

interface AppPropsType {
  root: HTMLDivElement;
  anchor: HTMLDivElement;
  cloneAnchor: HTMLDivElement;
  rect: DOMRect;
  content: ReactNode;
  next: () => void;
  pre: () => void;
}

function App(props: AppPropsType) {
  const { rect, anchor, cloneAnchor, content, root, next, pre } = props;

  const bem = useBem();

  return (
    <div className={cx(bem("guide"))}>
      <Content
        rect={rect}
        anchor={anchor}
        cloneAnchor={cloneAnchor}
        content={content}
        next={next}
        pre={pre}
        root={root}
      />
    </div>
  );
}

interface ContentPropsType extends AppPropsType {}

function getPos(rect: DOMRect) {
  const { innerWidth, innerHeight } = window;
  const result: Partial<{ -readonly [k in keyof DOMRect]?: number }> = {};
  if (rect.top >= Math.floor(innerHeight / 2)) {
    result.bottom = innerHeight - rect.top + rect.height;
  } else {
    result.top = rect.bottom + rect.height;
  }

  if (rect.left > Math.floor(innerWidth / 2)) {
    result.right = innerWidth - rect.left;
  } else {
    result.left = rect.left + rect.width;
  }

  return result;
}

function Content(props: ContentPropsType) {
  const { root, anchor, cloneAnchor, rect, content, next, pre } = props;
  const [pos, setPos] = useState(getPos(rect));
  const [tempPos, setTempPos] = useState({
    left: rect.left,
    top: rect.top,
  });
  const bem = useBem();

  useEffect(() => {
    const onResize = () => {
      const anchorPos = anchor.getBoundingClientRect();
      const aim = getPos(anchorPos);
      setPos(aim);
      setTempPos({
        left: anchorPos.left,
        top: anchorPos.top,
      });
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
    };
  }, []);

  return (
    <div className={cx(bem("guide", "content"))}>
      <div
        ref={(dom) => {
          dom?.append(cloneAnchor);
        }}
        style={{
          position: "absolute",
          width: anchor.clientWidth + 5,
          height: anchor.clientHeight + 5,
          ...tempPos,
        }}
      />
      <div
        className={cx(bem("guide", "mask"))}
        style={{
          // left: rect.left + rect.width,
          // top: rect.bottom - rect.height,
          ...pos,
        }}
      >
        <span
          className={cx(bem("guide", "close"))}
          onClick={() => {
            ReactDOM.unmountComponentAtNode(root);
          }}
        >
          x
        </span>
        <div>{content}</div>
        <button onClick={pre}>pre</button>
        <button onClick={next}>next</button>
      </div>
    </div>
  );
}
