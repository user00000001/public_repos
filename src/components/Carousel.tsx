import React, { useState } from "react";
import { 
  Carousel, 
  Radio, 
  RadioChangeEvent,
} from 'antd';
import { DotPosition } from "antd/es/carousel";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export const Basic: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export const Position: React.FC = () => {
  const [dotPosition, setDotPosition] = useState<DotPosition>('top');
  const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
    setDotPosition(value);
  };
  return (
    <>
      <Radio.Group onChange={handlePositionChange} value={dotPosition} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
      </Radio.Group>
      <Carousel dotPosition={dotPosition}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
};

const contentStyle1: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export const ScrollAutomatically: React.FC = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle1}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle1}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle1}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle1}>4</h3>
    </div>
  </Carousel>
);

const contentStyle2: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export const FadeIn: React.FC = () => (
  <Carousel effect="fade">
    <div>
      <h3 style={contentStyle2}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle2}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle2}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle2}>4</h3>
    </div>
  </Carousel>
);

export default [
  {
    label: "Carousel - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "Carousel - Position",
    children: React.createElement(Position),
  },
  {
    label: "Carousel - Scroll automatically",
    children: React.createElement(ScrollAutomatically),
  },
  {
    label: "Carousel - Fade in",
    children: React.createElement(FadeIn),
  },
]