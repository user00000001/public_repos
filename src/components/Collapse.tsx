import React, { useState } from "react";
import {
  Collapse,
  Divider,
  type CollapseProps,
  theme,
  Select,
  Space,
} from "antd";
import {
  CaretRightOutlined, SettingOutlined,
} from "@ant-design/icons";
import type { CSSProperties } from "react";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
    showArrow: false,
  },
];
export const Collapse_: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export const Size: React.FC = () => (
  <>
    <Divider orientation="left">Default Size</Divider>
    <Collapse
      items={[{ key: '1', label: 'This is default size panel header', children: <p>{text}</p> }]}
    />
    <Divider orientation="left">Small Size</Divider>
    <Collapse
      size="small"
      items={[{ key: '1', label: 'This is small size panel header', children: <p>{text}</p> }]}
    />
    <Divider orientation="left">Large Size</Divider>
    <Collapse
      size="large"
      items={[{ key: '1', label: 'This is large size panel header', children: <p>{text}</p> }]}
    />
  </>
);

export const Accordion: React.FC = () => <Collapse accordion items={items} />;

const itemsNest: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel nest panel',
    children: <p>{text}</p>,
  },
];
const items1: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <Collapse defaultActiveKey="1" items={itemsNest} />,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];
export const NestedPanel: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return <Collapse onChange={onChange} items={items1} />;
};

export const Borderless: React.FC = () => <Collapse items={items} bordered={false} defaultActiveKey={['1']} />;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];
export const CustomPanel: React.FC = () => {
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
      items={getItems(panelStyle)}
    />
  );
};

export const NoArrow: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} />;
};

const { Option } = Select;
type ExpandIconPosition = 'start' | 'end';
export const ExtraNode: React.FC = () => {
  const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('start');
  const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];
  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
        items={items}
      />
      <br />
      <span>Expand Icon Position: </span>
      <Select value={expandIconPosition} style={{ margin: '0 8px' }} onChange={onPositionChange}>
        <Option value="start">start</Option>
        <Option value="end">end</Option>
      </Select>
    </>
  );
};

export const GhostCollapse: React.FC = () => <Collapse defaultActiveKey={['1']} ghost items={items} />;

export const Collapsable: React.FC = () => (
  <Space direction="vertical">
    <Collapse
      collapsible="header"
      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'This panel can only be collapsed by clicking text',
          children: <p>{text}</p>,
        },
      ]}
    />
    <Collapse
      collapsible="icon"
      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'This panel can only be collapsed by clicking icon',
          children: <p>{text}</p>,
        },
      ]}
    />
    <Collapse
      collapsible="disabled"
      items={[
        {
          key: '1',
          label: "This panel can't be collapsed",
          children: <p>{text}</p>,
        },
      ]}
    />
  </Space>
);

export default [
  {
    label: "Collapse - Collapse",
    children: React.createElement(Collapse_),
  },
  {
    label: "Collapse - Size",
    children: React.createElement(Size),
  },
  {
    label: "Collapse - Accordion",
    children: React.createElement(Accordion),
  },
  {
    label: "Collapse - Nested panel",
    children: React.createElement(NestedPanel),
  },
  {
    label: "Collapse - Borderless",
    children: React.createElement(Borderless),
  },
  {
    label: "Collapse - No arrow",
    children: React.createElement(NoArrow),
  },
  {
    label: "Collapse - Extra node",
    children: React.createElement(ExtraNode),
  },
  {
    label: "Collapse - Ghost collapse",
    children: React.createElement(GhostCollapse),
  },
  {
    label: "Collapse - Collapsable",
    children: React.createElement(Collapsable),
  },
]