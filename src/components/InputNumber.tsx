import React, { useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  InputNumber,
  Select,
  Space,
} from "antd";
import {
  ClockCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const onChange = (value: (number | null)) => {
  console.log('changed', value);
};
export const Basic: React.FC = () => <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />;

export const Size: React.FC = () => (<Space wrap>
  <InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
  <InputNumber min={1} max={100000} defaultValue={3} onChange={onChange} />
  <InputNumber size="small" min={1} max={100000} defaultValue={3} onChange={onChange} />
</Space>);

const { Option } = Select;
const selectBefore = (
  <Select defaultValue="add" style={{ width: 60 }}>
    <Option value="add">+</Option>
    <Option value="minus">-</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue="USD" style={{ width: 60 }}>
    <Option value="USD">$</Option>
    <Option value="EUR">€</Option>
    <Option value="GBP">£</Option>
    <Option value="CNY">¥</Option>
  </Select>
);
export const PrePostTab: React.FC = () => (
  <Space direction="vertical">
    <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
    <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} defaultValue={100} />
    <InputNumber addonAfter={<SettingOutlined />} defaultValue={100} />
    <InputNumber
      addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />}
      defaultValue={100}
    />
    <InputNumber
      addonBefore="+"
      addonAfter={<SettingOutlined />}
      defaultValue={100}
      disabled
      controls
    />
    <InputNumber
      prefix="¥"
      addonBefore="+"
      addonAfter={<SettingOutlined />}
      defaultValue={100}
      disabled
      controls
    />
  </Space>
);

export const Disabled: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };
  return (
    <>
      <InputNumber min={1} max={10} disabled={disabled} defaultValue={3} />
      <div style={{ marginTop: 20 }}>
        <Button onClick={toggle} type="primary">
          Toggle disabled
        </Button>
      </div>
    </>
  );
};

const onChange1 = (value: (string | null)) => {
  console.log('changed', value);
};
export const HighPrecisionDecimals: React.FC = () => (
  <InputNumber<string>
    style={{ width: 200 }}
    defaultValue="1"
    min="0"
    max="10"
    step="0.00000000000001"
    onChange={onChange1}
    stringMode
  ></InputNumber>
);

const onChange2 = (value: string | null) => {
  console.log('changed', value);
};
export const Formatter: React.FC = () => (
  <Space>
    <InputNumber<string>
      defaultValue="1000"
      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
      onChange={onChange2}
    />
    <InputNumber<string>
      defaultValue="100"
      min="0"
      max="100"
      formatter={(value) => `${value}%`}
      parser={(value) => value!.replace('%', '')}
      onChange={onChange2}
    />
  </Space>
);

export const Keyboard: React.FC = () => {
  const [keyboard, setKeyboard] = useState(true);
  return (<Space>
    <InputNumber min={1} max={10} keyboard={keyboard} defaultValue={3} />
    <Checkbox onChange={() => { setKeyboard(!keyboard); }}
      checked={keyboard}>Toggle keyboard</Checkbox>
  </Space>);
}

export const Borderless: React.FC = () => <InputNumber min={1} max={10} defaultValue={3} bordered={false} />

export const OutOfRange: React.FC = () => {
  const [value, setValue] = useState<string | number | null>('99');
  return (
    <Space>
      <InputNumber min={1} max={10} value={value} onChange={setValue} />
      <Button
        type="primary"
        onClick={() => {
          setValue(99);
        }}
      >
        Reset
      </Button>
    </Space>
  );
};

export const Prefix: React.FC = () => (
  <>
    <InputNumber prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber addonBefore={<UserOutlined />} prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber prefix="￥" disabled style={{ width: '100%' }} />
  </>
);

export const Status: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <InputNumber status="error" style={{ width: '100%' }} />
    <InputNumber status="warning" style={{ width: '100%' }} />
    <InputNumber status="error" style={{ width: '100%' }} prefix={<ClockCircleOutlined />} />
    <InputNumber status="warning" style={{ width: '100%' }} prefix={<ClockCircleOutlined />} />
  </Space>
);

export default [
  {
    label: "InputNumber - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "InputNumber - Size",
    children: React.createElement(Size),
  },
  {
    label: "InputNumber - Pre / Post tab",
    children: React.createElement(PrePostTab),
  },
  {
    label: "InputNumber - Disabled",
    children: React.createElement(Disabled),
  },
  {
    label: "InputNumber - High precision decimals",
    children: React.createElement(HighPrecisionDecimals),
  },
  {
    label: "InputNumber - Formatter",
    children: React.createElement(Formatter),
  },
  {
    label: "InputNumber - Borderless",
    children: React.createElement(Borderless),
  },
  {
    label: "InputNumber - Out of range",
    children: React.createElement(OutOfRange),
  },
  {
    label: "InputNumber - Prefix",
    children: React.createElement(Prefix),
  },
  {
    label: "InputNumber - Status",
    children: React.createElement(Status),
  },
]