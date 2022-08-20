import React from "react";
interface PropsType {
  title: string;
  content: React.ReactNode;
}

console.log("====");
export function Modal(props: PropsType) {
  return (
    <div className="a">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}
