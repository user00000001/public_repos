import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Space, Spin, Switch } from "antd";
import React, { useState } from "react";
import "./Spin.css"

export const BasicUsage: React.FC = () => <Spin />;

export const Size: React.FC = () => (
  <Space size="middle">
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Space>
);

export const InsideAContainer: React.FC = () => (
  <div className="example">
    <Spin />
  </div>
);

export const EmbeddedMode: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const toggle = (checked: boolean) => {
    setLoading(checked);
  };
  return (
    <div>
      <Spin spinning={loading}>
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
      <div style={{ marginTop: 16 }}>
        Loading state：
        <Switch checked={loading} onChange={toggle} />
      </div>
    </div>
  );
};

export const CustomizedDescription: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Space>
      <Spin tip="Loading" size="small">
        <div className="content" />
      </Spin>
      <Spin tip="Loading">
        <div className="content" />
      </Spin>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Space>
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  </Space>
);

export const Delay: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const toggle = (checked: boolean) => {
    setLoading(checked);
  };
  const container = (
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
      type="info"
    />
  );
  return (
    <div>
      <Spin spinning={loading} delay={500}>
        {container}
      </Spin>
      <div style={{ marginTop: 16 }}>
        Loading state：
        <Switch checked={loading} onChange={toggle} />
      </div>
    </div>
  );
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const CustomSpinningIndicator: React.FC = () => <Spin indicator={antIcon} />;

export default [
  {
    label: "Spin - Basic Usage",
    children: React.createElement(BasicUsage),
  },
  {
    label: "Spin - Size",
    children: React.createElement(Size),
  },
  {
    label: "Spin - Inside a container",
    children: React.createElement(InsideAContainer),
  },
  {
    label: "Spin - Embedded mode",
    children: React.createElement(EmbeddedMode),
  },
  {
    label: "Spin - Customized description",
    children: React.createElement(CustomizedDescription),
  },
  {
    label: "Spin - delay",
    children: React.createElement(Delay),
  },
  {
    label: "Spin - Custom spinning indicator",
    children: React.createElement(CustomSpinningIndicator),
  },
]