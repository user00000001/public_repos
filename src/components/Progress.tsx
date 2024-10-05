import React, { useState } from "react";
import {
  Button,
  Progress, Space, Tooltip,
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { red, green } from '@ant-design/colors';

export const ProgressBar: React.FC = () => (
  <>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </>
);

export const CircularProgressBar: React.FC = () => (
  <Space wrap>
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
  </Space>
);

export const MiniSizeProgressBar: React.FC = () => (
  <div style={{ width: 170 }}>
    <Progress percent={30} size="small" />
    <Progress percent={50} size="small" status="active" />
    <Progress percent={70} size="small" status="exception" />
    <Progress percent={100} size="small" />
  </div>
);

export const ResponsiveCircularProgressBar: React.FC = () => (
  <>
    <Progress
      type="circle"
      trailColor="#e6f4ff"
      percent={60}
      strokeWidth={20}
      size={14}
      format={(number) => `进行中，已完成${number}%`}
    />
    <span style={{ marginLeft: 8 }}>代码发布</span>
  </>
);

export const MiniSizeCircularProgressBar: React.FC = () => (
  <Space wrap>
    <Progress type="circle" percent={30} size={80} />
    <Progress type="circle" percent={70} size={80} status="exception" />
    <Progress type="circle" percent={100} size={80} />
  </Space>
);

export const DynamicCircularProgressBar: React.FC = () => {
  const [percent, setPercent] = useState<number>(0);
  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };
  return (
    <>
      <Progress type="circle" percent={percent} style={{ marginRight: 8 }} />
      <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};

export const Dynamic: React.FC = () => {
  const [percent, setPercent] = useState<number>(0);
  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };
  return (
    <>
      <Progress percent={percent} />
      <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};

export const CustomTextFormat: React.FC = () => (
  <Space wrap>
    <Progress type="circle" percent={75} format={(percent) => `${percent} Days`} />
    <Progress type="circle" percent={100} format={() => 'Done'} />
  </Space>
);

export const Bashboard: React.FC = () => (
  <Space wrap>
    <Progress type="dashboard" percent={75} />
    <Progress type="dashboard" percent={75} gapDegree={30} />
  </Space>
);

export const ProgressBarWithSuccessSegment: React.FC = () => (
  <>
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} success={{ percent: 30 }} />
    </Tooltip>
    <Space wrap>
      <Tooltip title="3 done / 3 in progress / 4 to do">
        <Progress percent={60} success={{ percent: 30 }} type="circle" />
      </Tooltip>
      <Tooltip title="3 done / 3 in progress / 4 to do">
        <Progress percent={60} success={{ percent: 30 }} type="dashboard" />
      </Tooltip>
    </Space>
  </>
);

export const StrokeLinecap: React.FC = () => (
  <>
    <Progress strokeLinecap="butt" percent={75} />
    <Space wrap>
      <Progress strokeLinecap="butt" type="circle" percent={75} />
      <Progress strokeLinecap="butt" type="dashboard" percent={75} />
    </Space>
  </>
);

export const CustomLineGradient: React.FC = () => (
  <>
    <Progress percent={99.9} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
    <Progress percent={99.9} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
    <Space wrap>
      <Progress type="circle" percent={90} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
      <Progress type="circle" percent={100} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
    </Space>
  </>
);

export const ProgressBarWithSteps: React.FC = () => (
  <>
    <Progress percent={50} steps={3} />
    <br />
    <Progress percent={30} steps={5} />
    <br />
    <Progress percent={100} steps={5} size="small" strokeColor={green[6]} />
    <br />
    <Progress percent={60} steps={5} strokeColor={[green[6], green[6], red[5]]} />
  </>
);

export const ProgressSize: React.FC = () => (
  <>
    <Space direction="vertical">
      <Progress percent={50} />
      <Progress percent={50} size="small" />
      <Progress percent={50} size={[300, 20]} />
    </Space>
    <br />
    <br />
    <Space size={30}>
      <Progress type="circle" percent={50} />
      <Progress type="circle" percent={50} size="small" />
      <Progress type="circle" percent={50} size={20} />
    </Space>
    <br />
    <br />
    <Space size={30}>
      <Progress type="dashboard" percent={50} />
      <Progress type="dashboard" percent={50} size="small" />
      <Progress type="dashboard" percent={50} size={20} />
    </Space>
    <br />
    <br />
    <Space size={30} wrap>
      <Progress steps={3} percent={50} />
      <Progress steps={3} percent={50} size="small" />
      <Progress steps={3} percent={50} size={20} />
      <Progress steps={3} percent={50} size={[20, 30]} />
    </Space>
  </>
);

export default [
  {
    label: "Progress - Progress bar",
    children: React.createElement(ProgressBar),
  },
  {
    label: "Progress - Circular Progress bar",
    children: React.createElement(CircularProgressBar),
  },
  {
    label: "Progress - Mini size progress bar",
    children: React.createElement(MiniSizeProgressBar),
  },
  {
    label: "Progress - Responsive circular progress bar",
    children: React.createElement(ResponsiveCircularProgressBar),
  },
  {
    label: "Progress - Mini size circular Progress bar",
    children: React.createElement(MiniSizeCircularProgressBar),
  },
  {
    label: "Progress - Dynamic circular progress bar",
    children: React.createElement(DynamicCircularProgressBar),
  },
  {
    label: "Progress - Dynamic",
    children: React.createElement(Dynamic),
  },
  {
    label: "Progress - Custom text format",
    children: React.createElement(CustomTextFormat),
  },
  {
    label: "Progress - Dashboard",
    children: React.createElement(Bashboard),
  },
  {
    label: "Progress - Progress bar with success segment",
    children: React.createElement(ProgressBarWithSuccessSegment),
  },
  {
    label: "Progress - Stroke Linecap",
    children: React.createElement(StrokeLinecap),
  },
  {
    label: "Progress - Custom line gradient",
    children: React.createElement(CustomLineGradient),
  },
  {
    label: "Progress - Progress bar with steps",
    children: React.createElement(ProgressBarWithSteps),
  },
  {
    label: "Progress - Progress size",
    children: React.createElement(ProgressSize),
  },
]