import React, { useContext } from "react";
interface PropsType {
  title: string;
  content: React.ReactNode;
}

export function Modal(props: PropsType) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export function Test() {
  return <div>123123</div>;
}
