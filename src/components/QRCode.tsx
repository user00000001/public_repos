import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Popover, QRCode, QRCodeProps, Segmented, Space, theme } from "antd";
import React, { useState } from "react";

export const Base: React.FC = () => {
  const [text, setText] = React.useState('https://ant.design/');
  return (
    <Space direction="vertical" align="center">
      <QRCode value={text || '-'} />
      <Input
        placeholder="-"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Space>
  );
};

export const WithIcon: React.FC = () => (
  <QRCode
    errorLevel="H"
    value="https://ant.design/"
    icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
  />
);

export const OtherStatus: React.FC = () => (
  <Space wrap>
    <QRCode value="https://ant.design/" status="loading" />
    <QRCode value="https://ant.design/" status="expired" onRefresh={() => console.log('refresh')} />
  </Space>
);

export const CustomRenderType: React.FC = () => (
  <Space>
    <QRCode type="canvas" value="https://ant.design/" />
    <QRCode type="svg" value="https://ant.design/" />
  </Space>
);

export const CustomSize: React.FC = () => {
  const [size, setSize] = useState<number>(160);
  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 10;
      if (newSize > 300) {
        return 300;
      }
      return newSize;
    });
  };
  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 10;
      if (newSize < 48) {
        return 48;
      }
      return newSize;
    });
  };
  return (
    <>
      <Button.Group style={{ marginBottom: 16 }}>
        <Button onClick={decline} disabled={size <= 48} icon={<MinusOutlined />}>
          Smaller
        </Button>
        <Button onClick={increase} disabled={size >= 300} icon={<PlusOutlined />}>
          Larger
        </Button>
      </Button.Group>
      <QRCode
        errorLevel="H"
        size={size}
        iconSize={size / 4}
        value="https://ant.design/"
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
    </>
  );
};

const { useToken } = theme;
export const CustomColor: React.FC = () => {
  const { token } = useToken();
  return (
    <Space>
      <QRCode value="https://ant.design/" color={token.colorSuccessText} />
      <QRCode
        value="https://ant.design/"
        color={token.colorInfoText}
        bgColor={token.colorBgLayout}
      />
    </Space>
  );
};

const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
export const DownloadQRCode: React.FC = () => (
  <div id="myqrcode">
    <QRCode value="https://ant.design/" bgColor="#fff" style={{ marginBottom: 16 }} />
    <Button type="primary" onClick={downloadQRCode}>
      Download
    </Button>
  </div>
);

export const ErrorLevel: React.FC = () => {
  const [level, setLevel] = useState<string | number>('L');
  return (
    <>
      <QRCode
        style={{ marginBottom: 16 }}
        errorLevel={level as QRCodeProps['errorLevel']}
        value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
      <Segmented options={['L', 'M', 'Q', 'H']} value={level} onChange={setLevel} />
    </>
  );
};

const src = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
export const AdvancedUsage: React.FC = () => (
  <Popover overlayInnerStyle={{ padding: 0 }} content={<QRCode value={src} bordered={false} />}>
    <img width={100} height={100} src={src} alt="icon" />
  </Popover>
);

export default [
  {
    label: "QRCode - base",
    children: React.createElement(Base),
  },
  {
    label: "QRCode - With Icon",
    children: React.createElement(WithIcon),
  },
  {
    label: "QRCode - other status",
    children: React.createElement(OtherStatus),
  },
  {
    label: "QRCode - Custom Render Type",
    children: React.createElement(CustomRenderType),
  },
  {
    label: "QRCode - Custom Size",
    children: React.createElement(CustomSize),
  },
  {
    label: "QRCode - Custom Color",
    children: React.createElement(CustomColor),
  },
  {
    label: "QRCode - Download QRCode",
    children: React.createElement(DownloadQRCode),
  },
  {
    label: "QRCode - Error Level",
    children: React.createElement(ErrorLevel),
  },
  {
    label: "QRCode - Advanced Usage",
    children: React.createElement(AdvancedUsage),
  },
]