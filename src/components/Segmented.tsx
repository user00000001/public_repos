import {
  AppstoreOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Segmented,
  Space,
} from "antd";
import React, { useState } from "react";

export const ControlledMode: React.FC = () => {
  const [value, setValue] = useState<string | number>('Map');
  return <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />;
};

export const CustomRender: React.FC = () => (
  <Space direction="vertical">
    <Segmented
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              <div>User 1</div>
            </div>
          ),
          value: 'user1',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <div>User 2</div>
            </div>
          ),
          value: 'user2',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              <div>User 3</div>
            </div>
          ),
          value: 'user3',
        },
      ]}
    />
    <Segmented
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Spring</div>
              <div>Jan-Mar</div>
            </div>
          ),
          value: 'spring',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Summer</div>
              <div>Apr-Jun</div>
            </div>
          ),
          value: 'summer',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Autumn</div>
              <div>Jul-Sept</div>
            </div>
          ),
          value: 'autumn',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Winter</div>
              <div>Oct-Dec</div>
            </div>
          ),
          value: 'winter',
        },
      ]}
    />
  </Space>
);

export const Dynamic: React.FC = () => {
  const [options, setOptions] = useState(['Daily', 'Weekly', 'Monthly']);
  const [moreLoaded, setMoreLoaded] = useState(false);
  const handleLoadOptions = () => {
    setOptions((prev) => [...prev, 'Quarterly', 'Yearly']);
    setMoreLoaded(true);
  };
  return (
    <Space direction="vertical">
      <Segmented options={options} />
      <Button type="primary" disabled={moreLoaded} onClick={handleLoadOptions}>
        Load more options
      </Button>
    </Space>
  );
};

export const ThreeSizesOfSegmented: React.FC = () => (
  <Space direction="vertical">
    <Segmented size="large" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <Segmented size="small" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
  </Space>
);

export const WithIcon: React.FC = () => (
  <Segmented
    options={[
      {
        label: 'List',
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        label: 'Kanban',
        value: 'Kanban',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);

export const WithIconOnly: React.FC = () => (
  <Segmented
    options={[
      {
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        value: 'Kanban',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);

export default [
  {
    label: "Segmented - Basic",
    children: <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />,
  },
  {
    label: "Segmented - Block Segmented",
    children: <Segmented block options={[123, 456, 'longtext-longtext-longtext-longtext']} />,
  },
  {
    label: "Segmented - Disabled",
    children: (
      <Space direction="vertical">
        <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
        <Segmented
          options={[
            'Daily',
            { label: 'Weekly', value: 'Weekly', disabled: true },
            'Monthly',
            { label: 'Quarterly', value: 'Quarterly', disabled: true },
            'Yearly',
          ]}
        />
      </Space>
    ),
  },
  {
    label: "Segmented - Controlled mode",
    children: React.createElement(ControlledMode),
  },
  {
    label: "Segmented - Custom Render",
    children: React.createElement(CustomRender),
  },
  {
    label: "Segmented - Dynamic",
    children: React.createElement(Dynamic),
  },
  {
    label: "Segmented - Three sizes of Segmented",
    children: React.createElement(ThreeSizesOfSegmented),
  },
  {
    label: "Segmented - With Icon",
    children: React.createElement(WithIcon),
  },
  {
    label: "Segmented - With Icon only",
    children: React.createElement(WithIconOnly),
  },
]