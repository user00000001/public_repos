import React, { useState } from "react";
import {
  Button,
  Space,
  Switch,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};
export const Basic: React.FC = () => <Switch defaultChecked onChange={onChange} />;

export const Disabled: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };
  return (
    <Space direction="vertical">
      <Switch disabled={disabled} defaultChecked />
      <Button type="primary" onClick={toggle}>
        Toggle disabled
      </Button>
    </Space>
  );
};

export const TextAndIcon: React.FC = () => (
  <Space direction="vertical">
    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
    <Switch checkedChildren="1" unCheckedChildren="0" />
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      defaultChecked
    />
  </Space>
);

export const TwoSizes: React.FC = () => (
  <>
    <Switch defaultChecked />
    <br />
    <Switch size="small" defaultChecked />
  </>
);

export const Loading: React.FC = () => (
  <>
    <Switch loading defaultChecked />
    <br />
    <Switch size="small" loading />
  </>
);

export default [
  {
    label: "Switch - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "Switch - Disabled",
    children: React.createElement(Disabled),
  },
  {
    label: "Switch - Text & icon",
    children: React.createElement(TextAndIcon),
  },
  {
    label: "Switch - Two sizes",
    children: React.createElement(TwoSizes),
  },
  {
    label: "Switch - Loading",
    children: React.createElement(Loading),
  },
]