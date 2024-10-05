import React, { useState } from "react";
import type { MenuProps } from "antd";
import {
  Button,
  Divider,
  Dropdown,
  Space,
  Tooltip,
  Typography,
  message,
  theme,
} from "antd";
import {
  DownOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];
export const Basic: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export const Placement: React.FC = () => (
  <Space style={{ marginLeft: "200px", marginTop: "200px" }} direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottom">
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button>bottomRight</Button>
      </Dropdown>
    </Space>
    <Space wrap>
      <Dropdown menu={{ items }} placement="topLeft">
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="top">
        <Button>top</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="topRight">
        <Button>topRight</Button>
      </Dropdown>
    </Space>
  </Space>
);

export const Arrow: React.FC = () => (
  <>
    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <Button>bottom</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <Button>bottomRight</Button>
    </Dropdown>
    <br />
    <Dropdown menu={{ items }} placement="topLeft" arrow>
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="top" arrow>
      <Button>top</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="topRight" arrow>
      <Button>topRight</Button>
    </Dropdown>
  </>
);

export const OtherElements: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export const ArrowPointingAtTheCenter: React.FC = () => (
  <>
    <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
      <Button>bottom</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
      <Button>bottomRight</Button>
    </Dropdown>
    <br />
    <Dropdown menu={{ items }} placement="topLeft" arrow={{ pointAtCenter: true }}>
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="top" arrow={{ pointAtCenter: true }}>
      <Button>top</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="topRight" arrow={{ pointAtCenter: true }}>
      <Button>topRight</Button>
    </Dropdown>
  </>
);

export const TriggerMode: React.FC = () => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Click me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};
export const ClickEvent: React.FC = () => (
  <Dropdown menu={{ items, onClick }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me, Click menu item
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const menuProps = {
  items,
  onClick: handleMenuClick,
};
export const ButtonWithDropdownMenu: React.FC = () => (
  <Space wrap>
    <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button menu={menuProps} onClick={handleButtonClick} disabled>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      menu={menuProps}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="tooltip" key="leftButton">
          {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton as React.ReactElement<any, string>, { loading: true }),
      ]}
    >
      With Tooltip
    </Dropdown.Button>
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Button
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    <Dropdown.Button menu={menuProps} onClick={handleButtonClick} danger>
      Danger
    </Dropdown.Button>
  </Space>
);

const { useToken } = theme;
export const Customdropdown: React.FC = () => {
  const { token } = useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };
  return (
    <Dropdown
      menu={{ items }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          <Divider style={{ margin: 0 }} />
          <Space style={{ padding: 8 }}>
            <Button type="primary">Click me!</Button>
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

const items1: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: 'Group title',
    children: [
      {
        key: '1-1',
        label: '1st menu item',
      },
      {
        key: '1-2',
        label: '2nd menu item',
      },
    ],
  },
  {
    key: '2',
    label: 'sub menu',
    children: [
      {
        key: '2-1',
        label: '3rd menu item',
      },
      {
        key: '2-2',
        label: '4th menu item',
      },
    ],
  },
  {
    key: '3',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      {
        key: '3-1',
        label: '5d menu item',
      },
      {
        key: '3-2',
        label: '6th menu item',
      },
    ],
  },
];
export const CascadingMenu: React.FC = () => (
  <Dropdown menu={{ items: items1 }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Cascading menu
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export const TheWayOfHidingMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '3') {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };
  const items: MenuProps['items'] = [
    {
      label: 'Clicking me will not close the menu.',
      key: '1',
    },
    {
      label: 'Clicking me will not close the menu also.',
      key: '2',
    },
    {
      label: 'Clicking me will close the menu.',
      key: '3',
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export const ContextMenu: React.FC = () => {
  const {
    token: { colorBgLayout, colorTextTertiary },
  } = theme.useToken();

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div
        style={{
          color: colorTextTertiary,
          background: colorBgLayout,
          height: 200,
          textAlign: 'center',
          lineHeight: '200px',
        }}
      >
        Right Click on here
      </div>
    </Dropdown>
  );
};

export const Loading: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const enterLoading = (index: number) => {
    setLoadings((state) => {
      const newLoadings = [...state];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <Space direction="vertical">
      <Dropdown.Button type="primary" loading menu={{ items }}>
        Submit
      </Dropdown.Button>
      <Dropdown.Button type="primary" size="small" loading menu={{ items }}>
        Submit
      </Dropdown.Button>
      <Dropdown.Button
        type="primary"
        loading={loadings[0]}
        menu={{ items }}
        onClick={() => enterLoading(0)}
      >
        Submit
      </Dropdown.Button>
      <Dropdown.Button
        icon={<DownOutlined />}
        loading={loadings[1]}
        menu={{ items }}
        onClick={() => enterLoading(1)}
      >
        Submit
      </Dropdown.Button>
    </Space>
  );
};

export const SelectableMenu: React.FC = () => (
  <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ['3'],
    }}
  >
    <Typography.Link>
      <Space>
        Selectable
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);

export default [
  {
    label: 'Dropdown - Basic',
    children: React.createElement(Basic),
  },
  {
    label: 'Dropdown - Placement',
    children: React.createElement(Placement),
  },
  {
    label: 'Dropdown - Arrow',
    children: React.createElement(Arrow),
  },
  {
    label: 'Dropdown - Other elements',
    children: React.createElement(OtherElements),
  },
  {
    label: 'Dropdown - Arrow pointing at the center',
    children: React.createElement(ArrowPointingAtTheCenter),
  },
  {
    label: 'Dropdown - Trigger mode',
    children: React.createElement(TriggerMode),
  },
  {
    label: 'Dropdown - Click event',
    children: React.createElement(ClickEvent),
  },
  {
    label: 'Dropdown - Button with dropdown menu',
    children: React.createElement(ButtonWithDropdownMenu),
  },
  {
    label: 'Dropdown - Custom dropdown',
    children: React.createElement(Customdropdown),
  },
  {
    label: 'Dropdown - Cascading menu',
    children: React.createElement(CascadingMenu),
  },
  {
    label: 'Dropdown - The way of hiding menu.',
    children: React.createElement(TheWayOfHidingMenu),
  },
  {
    label: 'Dropdown - Context Menu',
    children: React.createElement(ContextMenu),
  },
  {
    label: 'Dropdown - Loading',
    children: React.createElement(Loading),
  },
  {
    label: 'Dropdown - Selectable Menu',
    children: React.createElement(SelectableMenu),
  },
]