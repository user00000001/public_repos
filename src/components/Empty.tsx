import React, { useState } from "react";
import {
  Button,
  Cascader,
  ConfigProvider,
  Divider,
  Empty,
  List,
  Select,
  Space,
  Switch,
  Table,
  Transfer,
  TreeSelect,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";

export const Basic: React.FC = () => <Empty />

export const ChoseImage: React.FC = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

export const Customize: React.FC = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 60 }}
    description={
      <span>
        Customize <a href="#API">Description</a>
      </span>
    }
  >
    <Button type="primary">Create Now</Button>
  </Empty>
);

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>Data Not Found</p>
  </div>
);
const style: React.CSSProperties = { width: 200 };
export const ConfigProvider_: React.FC = () => {
  const [customize, setCustomize] = useState(true);
  return (
    <>
      <Switch
        unCheckedChildren="default"
        checkedChildren="customize"
        checked={customize}
        onChange={setCustomize}
      />
      <Divider />
      <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <h4>Select</h4>
          <Select style={style} />
          <h4>TreeSelect</h4>
          <TreeSelect style={style} treeData={[]} />
          <h4>Cascader</h4>
          <Cascader style={style} options={[]} showSearch />
          <h4>Transfer</h4>
          <Transfer />
          <h4>Table</h4>
          <Table
            style={{ marginTop: 8 }}
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Age', dataIndex: 'age', key: 'age' },
            ]}
          />
          <h4>List</h4>
          <List />
        </Space>
      </ConfigProvider>
    </>
  );
};

export const NoDescription: React.FC = () => <Empty description={false} />;

export default [
  {
    label: "Empty - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "Empty - Chose image",
    children: React.createElement(ChoseImage),
  },
  {
    label: "Empty - Customize",
    children: React.createElement(Customize),
  },
  {
    label: "Empty - ConfigProvider",
    children: React.createElement(ConfigProvider_),
  },
  {
    label: "Empty - No description",
    children: React.createElement(NoDescription),
  },
]