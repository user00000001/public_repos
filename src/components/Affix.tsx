import { Affix, Button } from "antd";
import React, { useState } from "react";

export const Basic: React.FC = () => {
  const [top, setTop] = useState(10);
  const [bottom, setBottom] = useState(10);
  return (
    <>
      <Affix offsetTop={top}>
        <Button type="primary" onClick={() => setTop(top + 10)}>
          Affix top
        </Button>
      </Affix>
      <br />
      <Affix offsetBottom={bottom}>
        <Button type="primary" onClick={() => setBottom(bottom + 10)}>
          Affix bottom
        </Button>
      </Affix>
    </>
  );
};

export const Callback: React.FC = () => (
  <Affix offsetTop={120} onChange={(affixed) => console.log(affixed)}>
    <Button>120px to affix top</Button>
  </Affix>
);

export const ContainerToScroll: React.FC = () => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return (
    <div className="scrollable-container" ref={setContainer}>
      <div className="background">
        <Affix target={() => container}>
          <Button type="primary">Fixed at the top of container</Button>
        </Affix>
      </div>
    </div>
  );
};

export default [
  {
    label: "Affix - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "Affix - Callback",
    children: React.createElement(Callback),
  },
  {
    label: "Affix - Container to scroll",
    children: React.createElement(ContainerToScroll),
  },
]