import React, { useState } from "react";
import type { MenuProps } from "antd";
import {
  Button,
  Space,
  Tooltip,
  Radio,
  Divider,
  Dropdown,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import type { SizeType } from "antd/es/config-provider/SizeContext";

const Type: React.FC = () => (
  <Space>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
);

const Icon: React.FC = () => (
  <Space direction="vertical">
    <Space wrap>
      <Tooltip title="search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />}></Button>
      </Tooltip>
      <Button type="primary" shape="circle">A</Button>
      <Button type="primary" icon={<SearchOutlined />}>Search</Button>
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />}></Button>
      </Tooltip>
      <Button icon={<SearchOutlined />}>Search</Button>
    </Space>
    <Space wrap>
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />}></Button>
      </Tooltip>
      <Button icon={<SearchOutlined />}>Search</Button>
      <Tooltip title="search">
        <Button type="dashed" shape="circle" icon={<SearchOutlined />}></Button>
      </Tooltip>
      <Button type="dashed" icon={<SearchOutlined />}>Search</Button>
      <Button icon={<SearchOutlined />} href="https://www.google.com"></Button>
    </Space>
  </Space>
);

const Size: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large');
  return (
    <>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <Divider orientation="left">Preview</Divider>
      <Space direction="vertical">
        <Space wrap>
          <Button type="primary">Primary</Button>
          <Button size={size}>Default</Button>
          <Button type="dashed" size={size}>Dashed</Button>
        </Space>
        <Button type="link" size={size}>Link</Button>
        <Space wrap>
          <Button type="primary" icon={<DownloadOutlined />} size={size}></Button>
          <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size}></Button>
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}></Button>
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>Download</Button>
          <Button type="primary" icon={<DownloadOutlined />} size={size}>Download</Button>
        </Space>
      </Space>
    </>
  )
};

const Disabled: React.FC = () => (
  <Space direction="vertical">
    <Space>
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>Primary(disabled)</Button>
    </Space>
    <Space>
      <Button>Default</Button>
      <Button disabled>Default(disabled)</Button>
    </Space>
    <Space>
      <Button type="dashed">Dashed</Button>
      <Button type="dashed" disabled>Dashed(disabled)</Button>
    </Space>
    <Space>
      <Button type="text">Text</Button>
      <Button type="text" disabled>Text(disabled)</Button>
    </Space>
    <Space>
      <Button type="link">Link</Button>
      <Button type="link" disabled>Link(disabled)</Button>
    </Space>
    <Space>
      <Button type="primary" href="https://ant.design/index-cn">Href Primary</Button>
      <Button type="primary" href="https://ant.design/index-cn" disabled>Href Primary(disabled)</Button>
    </Space>
    <Space>
      <Button danger>Danger Default</Button>
      <Button danger disabled>Danger Default(disabled)</Button>
    </Space>
    <Space>
      <Button type="text" danger>Danger Text</Button>
      <Button type="text" danger disabled>Danger Text(disabled)</Button>
    </Space>
    <Space>
      <Button type="link" danger>Danger Link</Button>
      <Button type="link" danger disabled>Danger Link(disabled)</Button>
    </Space>
    <Space style={{ backgroundColor: "lightgrey" }}>
      <Button ghost>Ghost</Button>
      <Button ghost disabled>Ghost(disabled)</Button>
    </Space>
  </Space>
);

const Loading: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      })
    }, 6000);
  };
  return (
    <Space direction="vertical">
      <Space wrap>
        <Button type="primary" loading>Loading</Button>
        <Button type="primary" size="small" loading>Loading</Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading />
      </Space>
      <Space wrap>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>Click me!</Button>
        <Button type="primary" size="small" loading={loadings[1]} onClick={() => enterLoading(1)}>Click me!</Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading={loadings[2]} onClick={() => enterLoading(2)} />
      </Space>
    </Space>
  );
};

const onMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
const items = [
  {
    key: '1',
    label: '1st item',
  },
  {
    key: '2',
    label: '2nd item',
  },
  {
    key: '3',
    label: '3rd item',
  },
];
const MutipleButtons: React.FC = () => (
  <Space direction="vertical">
    <Button type="primary">primary</Button>
    <Button>Secondary</Button>
    <Dropdown.Button menu={{ items, onClick: onMenuClick }}>Actions</Dropdown.Button>
  </Space>
);

const GhostButton: React.FC = () => (
  <Space style={{ backgroundColor: "lightgrey" }} wrap>
    <Button type="primary" ghost>Primary</Button>
    <Button ghost>Default</Button>
    <Button ghost type="dashed">Dashed</Button>
    <Button ghost danger type="primary">Danger</Button>
  </Space>
);

const DangerButtons: React.FC = () => (
  <Space wrap>
    <Button type="primary" danger>Primary</Button>
    <Button danger>Default</Button>
    <Button type="dashed" danger>Dashed</Button>
    <Button type="text" danger>Text</Button>
    <Button type="link" danger>Link</Button>
  </Space>
);

const BlockButton: React.FC = () => (
  <Space direction="vertical" style={{ width: "100%" }}>
    <Button type="primary" block>Primary</Button>
    <Button block>Default</Button>
    <Button type="dashed" block>Dashed</Button>
    <Button block disabled>disabled</Button>
    <Button type="text" block>text</Button>
    <Button type="link" block>Link</Button>
  </Space>
);

export {
  Type,
  Icon,
  Size,
  Disabled,
  Loading,
  MutipleButtons,
  GhostButton,
  DangerButtons,
  BlockButton,
}

export default [
  {
    label: "Button - Type",
    children: <Type />
  },
  {
    label: "Button - Icon",
    children: <Icon />
  },
  {
    label: "Button - Size",
    children: <Size />
  },
  {
    label: "Button - Disabled",
    children: <Disabled />
  },
  {
    label: "Button - Loading",
    children: <Loading />
  },
  {
    label: "Button - Mutiple Buttons",
    children: <MutipleButtons />
  },
  {
    label: "Button - Ghost Button",
    children: <GhostButton />
  },
  {
    label: "Button - Danger Buttons",
    children: <DangerButtons />
  },
  {
    label: "Button - Block Button",
    children: <BlockButton />
  }
]