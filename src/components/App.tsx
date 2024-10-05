import { App, Button, Space } from "antd";
import React from "react";

// Sub page
const MyPage = () => {
  const { message, modal, notification } = App.useApp();
  const showMessage = () => {
    message.success('Success!');
  };
  const showModal = () => {
    modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  };
  const showNotification = () => {
    notification.info({
      message: `Notification topLeft`,
      description: 'Hello, Ant Design!!',
      placement: 'topLeft',
    });
  };
  return (
    <Space>
      <Button type="primary" onClick={showMessage}>
        Open message
      </Button>
      <Button type="primary" onClick={showModal}>
        Open modal
      </Button>
      <Button type="primary" onClick={showNotification}>
        Open notification
      </Button>
    </Space>
  );
};
// Entry component
export const Basic: React.FC = () => (
  <App>
    <MyPage />
  </App>
);

// Sub page
const MyPage1 = () => {
  const { message, notification } = App.useApp();
  const showMessage = () => {
    message.success('Success!');
  };
  const showNotification = () => {
    notification.info({
      message: `Notification`,
      description: 'Hello, Ant Design!!',
    });
  };
  return (
    <Space>
      <Button type="primary" onClick={showMessage}>
        Message for only one
      </Button>
      <Button type="primary" onClick={showNotification}>
        Notification for bottomLeft
      </Button>
    </Space>
  );
};
// Entry component
export const HooksConfig = () => (
  <App message={{ maxCount: 1 }} notification={{ placement: 'bottomLeft' }}>
    <MyPage1 />
  </App>
);

export default [
  {
    label: "App - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "App - Hooks config",
    children: React.createElement(HooksConfig),
  },
]