import React, { useState } from "react";
import {
  Col,
  InputNumber,
  Row,
  Slider,
  Space,
  Switch,
} from "antd";
import {
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  type SliderMarks,
} from "antd/es/slider";
import "./Slider.css";

export const Basic: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked: boolean) => {
    setDisabled(checked);
  };
  return (
    <>
      <Slider defaultValue={30} disabled={disabled} />
      <Slider range defaultValue={[20, 50]} disabled={disabled} />
      Disabled: <Switch size="small" checked={disabled} onChange={onChange} />
    </>
  );
};

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue: number | null) => {
    setInputValue(newValue!);
  };
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
const DecimalStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const onChange = (value: number | null) => {
    if (isNaN(value!)) {
      return;
    }
    setInputValue(value!);
  };
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={0}
          max={1}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          step={0.01}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={1}
          style={{ margin: '0 16px' }}
          step={0.01}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
export const SliderWithInputNumber: React.FC = () => (
  <Space style={{ width: '100%' }} direction="vertical">
    <IntegerStep />
    <DecimalStep />
  </Space>
);

interface IconSliderProps {
  max: number;
  min: number;
}
const IconSlider: React.FC<IconSliderProps> = (props) => {
  const { max, min } = props;
  const [value, setValue] = useState(0);
  const mid = Number(((max - min) / 2).toFixed(5));
  const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
  const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';
  return (
    <div className="icon-wrapper">
      <FrownOutlined className={preColorCls} />
      <Slider {...props} onChange={setValue} value={value} />
      <SmileOutlined className={nextColorCls} />
    </div>
  );
};
export const SliderWithIcon: React.FC = () => <IconSlider min={0} max={20} />;

const formatter = (value: number | undefined) => `${value}%`;
export const CustomizeTooltip: React.FC = () => (
  <>
    <Slider tooltip={{ formatter }} />
    <Slider tooltip={{ formatter: null }} />
  </>
);

const onChange = (value: number | [number, number]) => {
  console.log('onChange: ', value);
};
const onAfterChange = (value: number | [number, number]) => {
  console.log('onAfterChange: ', value);
};
export const Event: React.FC = () => (
  <>
    <Slider defaultValue={30} onChange={onChange} onAfterChange={onAfterChange} />
    <Slider
      range
      step={10}
      defaultValue={[20, 50]}
      onChange={onChange}
      onAfterChange={onAfterChange}
    />
  </>
);

const marks: SliderMarks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};
export const GraduatedSlider: React.FC = () => (
  <>
    <h4>included=true</h4>
    <Slider marks={marks} defaultValue={37} />
    <Slider range marks={marks} defaultValue={[26, 37]} />
    <h4>included=false</h4>
    <Slider marks={marks} included={false} defaultValue={37} />
    <h4>marks & step</h4>
    <Slider marks={marks} step={10} defaultValue={37} />
    <h4>step=null</h4>
    <Slider marks={marks} step={null} defaultValue={37} />
  </>
);

const style: React.CSSProperties = {
  display: 'inline-block',
  height: 300,
  marginLeft: 70,
};
export const Vertical: React.FC = () => (
  <>
    <div style={style}>
      <Slider vertical defaultValue={30} />
    </div>
    <div style={style}>
      <Slider vertical range step={10} defaultValue={[20, 50]} />
    </div>
    <div style={style}>
      <Slider vertical range marks={marks} defaultValue={[26, 37]} />
    </div>
  </>
);

export const ControlVisibleOfToolTip: React.FC = () => <Slider defaultValue={30} tooltip={{ open: true }} />

export const Reverse: React.FC = () => {
  const [reverse, setReverse] = useState(true);
  return (
    <>
      <Slider defaultValue={30} reverse={reverse} />
      <Slider range defaultValue={[20, 50]} reverse={reverse} />
      Reversed: <Switch size="small" checked={reverse} onChange={setReverse} />
    </>
  );
}

export const DraggableTrack: React.FC = () => <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />

export default [
  {
    label: "Slider - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "Slider - Slider with InputNumber",
    children: React.createElement(SliderWithInputNumber),
  },
  {
    label: "Slider - Slider with icon",
    children: React.createElement(SliderWithIcon),
  },
  {
    label: "Slider - Customize tooltip",
    children: React.createElement(CustomizeTooltip),
  },
  {
    label: "Slider - Event",
    children: React.createElement(Event),
  },
  {
    label: "Slider - Graduated slider",
    children: React.createElement(GraduatedSlider),
  },
  {
    label: "Slider - Vertical",
    children: React.createElement(Vertical),
  },
  {
    label: "Slider - Control visible of ToolTip",
    children: React.createElement(ControlVisibleOfToolTip),
  },
  {
    label: "Slider - Reverse",
    children: React.createElement(Reverse),
  },
  {
    label: "Slider - Draggable track",
    children: React.createElement(DraggableTrack),
  },
]