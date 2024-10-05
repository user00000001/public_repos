import { CommentOutlined, CustomerServiceOutlined, FileTextOutlined, QuestionCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { FloatButton, Switch } from "antd";
import React, { useState } from "react";

const Basic: React.FC = () => <FloatButton onClick={() => console.log('click')} />;

const Type: React.FC = () => (
  <>
    <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ right: 24 }} />
    <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ right: 94 }} />
  </>
);

const Shap: React.FC = () => (
  <>
    <FloatButton shape="circle" type="primary" style={{ right: 94 }} icon={<CustomerServiceOutlined />} />
    <FloatButton shape="square" type="primary" style={{ right: 24 }} icon={<CustomerServiceOutlined />} />
  </>
);

const Description: React.FC = () => (
  <>
    <FloatButton icon={<FileTextOutlined />} description="HELP INFO" shape="square" style={{ right: 24 }} />
    <FloatButton description="HELP INFO" shape="square" style={{ right: 94 }} />
    <FloatButton icon={<FileTextOutlined />} description="HELP" shape="square" style={{ right: 164 }} />
  </>
);

const FloatButtonWithTooltip: React.FC = () => <FloatButton tooltip={<div>Documents</div>} />;

const FloatButtonGroup: React.FC = () => (
  <>
    <FloatButton.Group shape="circle" style={{ right: 24 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
    <FloatButton.Group shape="square" style={{ right: 94 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton icon={<SyncOutlined />} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

const MenuMode: React.FC = () => (
  <>
    <FloatButton.Group trigger="click" type="primary" style={{ right: 24 }} icon={<CustomerServiceOutlined />}>
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
    <FloatButton.Group trigger="hover" type="primary" style={{ right: 94 }} icon={<CustomerServiceOutlined />}>
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
  </>
);

const ControlledMode: React.FC = () => {
  const [open, setOpen] = useState(true);
  const onChange = (checked: boolean) => {
    setOpen(checked);
  }
  return (
    <>
      <FloatButton.Group open={open} trigger="click" style={{ right: 24 }} icon={<CustomerServiceOutlined />}>
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <Switch onChange={onChange} checked={open} style={{ margin: 16 }} />
    </>
  );
};

const BackTop: React.FC = () => (
  <div style={{ height: '500vh', padding: 10 }}>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <FloatButton.BackTop />
  </div>
);

const Badge: React.FC = () => (
  <>
    <FloatButton shape="circle" badge={{ dot: true }} style={{ right: 24 + 70 + 70 }} />
    <FloatButton.Group shape="circle" style={{ right: 24 + 70 }}>
      <FloatButton tooltip={<div>custom badge color</div>} badge={{ count: 5, color: 'blue' }} />
      <FloatButton badge={{ count: 5 }} />
    </FloatButton.Group>
    <FloatButton.Group shape="circle">
      <FloatButton badge={{ count: 12 }} icon={<QuestionCircleOutlined />} />
      <FloatButton badge={{ count: 123, overflowCount: 999 }} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export {
  Basic,
  Type,
  Shap,
  Description,
  FloatButtonWithTooltip,
  FloatButtonGroup,
  MenuMode,
  ControlledMode,
  BackTop,
  Badge,
};

export default [
  {
    label: "FloatButton - Basic",
    children: <Basic />
  },
  {
    label: "FloatButton - Type",
    children: <Type />
  },
  {
    label: "FloatButton - Shape",
    children: <Shap />
  },
  {
    label: "FloatButton - Description",
    children: <Description />
  },
  {
    label: "FloatButton - FloatButton with tooltip",
    children: <FloatButtonWithTooltip />
  },
  {
    label: "FloatButton - FloatButton Group",
    children: <FloatButtonGroup />
  },
  {
    label: "FloatButton - Menu mode",
    children: <MenuMode />
  },
  {
    label: "FloatButton - Controlled mode",
    children: <ControlledMode />
  },
  {
    label: "FloatButton - BackTop",
    children: <BackTop />
  },
  {
    label: "FloatButton - badge",
    children: <Badge />
  }
]