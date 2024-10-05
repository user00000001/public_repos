import React, { useState } from "react";
import {
  Rate,
} from "antd";
import {
  FrownOutlined,
  HeartOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  StarProps,
} from "rc-rate/lib/Star";

export const Basic: React.FC = () => <Rate />

export const HalfStar: React.FC = () => <Rate allowHalf defaultValue={2.5} />

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderfull'];
export const ShowCopywriting: React.FC = () => {
  const [value, setValue] = useState(3);
  return (
    <span>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
    </span>
  );
};

export const ReadOnly: React.FC = () => <Rate disabled defaultValue={2} />

export const ClearStar: React.FC = () => (
  <>
    <Rate defaultValue={3} />
    <span className="ant-rate-text">allowClear: true</span>
    <br />
    <Rate allowClear={false} defaultValue={3} />
    <span className="ant-rate-text">allowClear: false</span>
  </>
);

export const OtherCharacter: React.FC = () => (
  <>
    <Rate character={<HeartOutlined />} allowHalf />
    <br />
    <Rate character="A" allowHalf style={{ fontSize: 36 }} />
    <br />
    <Rate character="好" allowHalf />
  </>
);

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
export const CustomizeCharacter: React.FC = () => (
  <>
    <Rate defaultValue={2} character={({ index }: StarProps) => index! + 1} />
    <br />
    <Rate defaultValue={3} character={({ index }: StarProps) => customIcons[index! + 1]} />
  </>
);

export default [
  {
    label: "Rate - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "Rate - Half star",
    children: React.createElement(HalfStar),
  },
  {
    label: "Rate - Show copywriting",
    children: React.createElement(ShowCopywriting),
  },
  {
    label: "Rate - ReadOnly",
    children: React.createElement(ReadOnly),
  },
  {
    label: "Rate - Clear star",
    children: React.createElement(ClearStar),
  },
  {
    label: "Rate - Other Character",
    children: React.createElement(OtherCharacter),
  },
  {
    label: "Rate - Customize Character",
    children: React.createElement(CustomizeCharacter),
  },
]