import React, { useState } from "react";
import {
  Col,
  Row,
  Divider,
  Grid,
  Tag,
  Slider,
} from "antd";

export const BasicGrid: React.FC = () => (
  <>
    <Row>
      <Col span={24} style={{ backgroundColor: "lightgreen" }}>col</Col>
    </Row>
    <Row>
      <Col span={12} style={{ backgroundColor: "lightblue" }}>col-12</Col>
      <Col span={12} style={{ backgroundColor: "lightgreen" }}>col-12</Col>
    </Row>
    <Row>
      <Col span={8} style={{ backgroundColor: "lightblue" }}>col-8</Col>
      <Col span={8} style={{ backgroundColor: "lightgreen" }}>col-8</Col>
      <Col span={8} style={{ backgroundColor: "lightblue" }}>col-8</Col>
    </Row>
    <Row>
      <Col span={6} style={{ backgroundColor: "lightblue" }}>col-6</Col>
      <Col span={6} style={{ backgroundColor: "lightgreen" }}>col-6</Col>
      <Col span={6} style={{ backgroundColor: "lightblue" }}>col-6</Col>
      <Col span={6} style={{ backgroundColor: "lightgreen" }}>col-6</Col>
    </Row>
  </>
);

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };
export const GridGutter: React.FC = () => (
  <>
    <Divider orientation="left">Horizontal</Divider>
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
    <Divider orientation="left">Responsive</Divider>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
    <Divider orientation="left">Vertical</Divider>
    <Row gutter={[16, 24]}>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
  </>
);

export const ColumnOffset: React.FC = () => (
  <>
    <Row>
      <Col style={{ backgroundColor: 'lightskyblue' }} span={8}>col-8</Col>
      <Col style={{ backgroundColor: 'lightskyblue' }} span={8} offset={8}>col-8</Col>
    </Row>
    <Row>
      <Col style={{ backgroundColor: 'lightskyblue' }} span={6} offset={6}>col-6 col-offset-6</Col>
      <Col style={{ backgroundColor: 'lightskyblue' }} span={6} offset={6}>col-6 col-offset-6</Col>
    </Row>
    <Row>
      <Col style={{ backgroundColor: 'lightskyblue' }} span={12} offset={6}>col-12 col-offset-6</Col>
    </Row>
  </>
);

export const GridSort: React.FC = () => (
  <Row>
    <Col style={{ background: 'lightblue' }} span={18} push={6}>col-18 col-push-6</Col>
    <Col style={{ background: "lightskyblue" }} span={6} pull={18}>col-6 col-pull-18</Col>
  </Row>
);

export const Typesetting: React.FC = () => (
  <>
    <Divider orientation="left">sub-element align left</Divider>
    <Row justify="start">
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align center</Divider>
    <Row justify="center">
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align right</Divider>
    <Row justify="end">
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align monospaced arrangement</Divider>
    <Row justify="space-between">
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align full</Divider>
    <Row justify="space-around">
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align evenly</Divider>
    <Row justify="space-evenly">
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightskyblue' }} span={4}>col-4</Col>
      <Col style={{ background: 'lightsteelblue' }} span={4}>col-4</Col>
    </Row>
  </>
);

const DemoBox: React.FC<{ children: React.ReactNode; value: number }> = props => <p style={{ height: props.value }} className={`height-${props.value}`}>{props.children}</p>
export const Alignment: React.FC = () => (
  <>
    <Divider orientation="left">Align Top</Divider>
    <Row justify="center" align="top" style={{ backgroundColor: "lightgrey" }}>
      <Col style={{ backgroundColor: "lightskyblue" }} span={4}><DemoBox value={100}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightsteelblue" }} span={4}><DemoBox value={50}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightskyblue" }} span={4}><DemoBox value={120}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightsteelblue" }} span={4}><DemoBox value={80}>col-4</DemoBox></Col>
    </Row>
    <Divider orientation="left">Align Middle</Divider>
    <Row justify="space-around" align="middle" style={{ backgroundColor: "lightgrey" }}>
      <Col style={{ backgroundColor: "lightskyblue" }} span={4}><DemoBox value={100}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightsteelblue" }} span={4}><DemoBox value={50}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightskyblue" }} span={4}><DemoBox value={120}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightsteelblue" }} span={4}><DemoBox value={80}>col-4</DemoBox></Col>
    </Row>
    <Divider orientation="left">Align Bottom</Divider>
    <Row justify="space-between" align="bottom" style={{ backgroundColor: "lightgrey" }}>
      <Col style={{ backgroundColor: "lightskyblue" }} span={4}><DemoBox value={100}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightsteelblue" }} span={4}><DemoBox value={50}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightskyblue" }} span={4}><DemoBox value={120}>col-4</DemoBox></Col>
      <Col style={{ backgroundColor: "lightsteelblue" }} span={4}><DemoBox value={80}>col-4</DemoBox></Col>
    </Row>
  </>
);

export const Order: React.FC = () => (<>
  <Divider orientation="left">Normal</Divider>
  <Row>
    <Col style={{ backgroundColor: "lightskyblue" }} span={6} order={4}>
      1 col-order-4
    </Col>
    <Col style={{ backgroundColor: "lightsteelblue" }} span={6} order={3}>
      2 col-order-3
    </Col>
    <Col style={{ backgroundColor: "lightskyblue" }} span={6} order={2}>
      3 col-order-2
    </Col>
    <Col style={{ backgroundColor: "lightsteelblue" }} span={6} order={1}>
      4 col-order-1
    </Col>
  </Row>
  <Divider orientation="left">Responsive</Divider>
  <Row>
    <Col style={{ backgroundColor: "lightskyblue" }} span={6} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
      1 col-order-responsive
    </Col>
    <Col style={{ backgroundColor: "lightsteelblue" }} span={6} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 3 }}>
      2 col-order-responsive
    </Col>
    <Col style={{ backgroundColor: "lightskyblue" }} span={6} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 1 }}>
      3 col-order-responsive
    </Col>
    <Col style={{ backgroundColor: "lightsteelblue" }} span={6} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 2 }}>
      4 col-order-responsive
    </Col>
  </Row>
</>);

export const FlexStretch: React.FC = () => (<>
  <Divider orientation="left">Percentage columns</Divider>
  <Row>
    <Col style={{ backgroundColor: "lightblue" }} flex={2}>2 / 5</Col>
    <Col style={{ backgroundColor: "lightcyan" }} flex={3}>3 / 5</Col>
  </Row>
  <Divider orientation="left">Fill rest</Divider>
  <Row>
    <Col style={{ backgroundColor: "lightblue" }} flex="100px">100px</Col>
    <Col style={{ backgroundColor: "lightcyan" }} flex="auto">Fill Rest</Col>
  </Row>
  <Divider orientation="left">Raw flex style</Divider>
  <Row>
    <Col style={{ backgroundColor: "lightblue" }} flex="1 1 200px">1 1 200px</Col>
    <Col style={{ backgroundColor: "lightcyan" }} flex="0 1 300px">0 1 300px</Col>
  </Row>

  <Row wrap={false}>
    <Col style={{ backgroundColor: "lightblue" }} flex="none">
      <div style={{ padding: '0 16px' }}>none</div>
    </Col>
    <Col style={{ backgroundColor: "lightcyan" }} flex="auto">auto with no-wrap</Col>
  </Row>
</>);

export const Responsive: React.FC = () => (
  <Row>
    <Col style={{ backgroundColor: "lightblue" }} xs={2} sm={4} md={6} lg={8} xl={10}>Col</Col>
    <Col style={{ backgroundColor: "lightskyblue" }} xs={20} sm={16} md={12} lg={8} xl={4}>Col</Col>
    <Col style={{ backgroundColor: "lightblue" }} xs={2} sm={4} md={6} lg={8} xl={10}>Col</Col>
  </Row>
);

export const MoreResponsive: React.FC = () => (
  <Row>
    <Col style={{ backgroundColor: "lightblue" }} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
    <Col style={{ backgroundColor: "lightskyblue" }} xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
    <Col style={{ backgroundColor: "lightblue" }} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
  </Row>
);

const gutters: Record<PropertyKey, number> = {};
const vgutters: Record<PropertyKey, number> = {};
const colCounts: Record<PropertyKey, number> = {};
[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  gutters[i] = value;
});
[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  vgutters[i] = value;
});
[2, 3, 4, 6, 8, 12].forEach((value, i) => {
  colCounts[i] = value;
});
export const Playground: React.FC = () => {
  const [gutterKey, setGutterKey] = useState(1);
  const [vgutterKey, setVgutterKey] = useState(1);
  const [colCountKey, setColCountKey] = useState(2);
  const cols = [];
  const colCount = colCounts[colCountKey];
  let colCode = '';
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} span={24 / colCount}><div style={style}>Column</div></Col>
    );
    colCode += ` <Col span={${24 / colCount}} />\n`;
  }
  return (<>
    <span>Horizontal Gutter (px): </span>
    <div style={{ width: '50%' }}>
      <Slider min={0} max={Object.keys(gutters).length - 1} value={gutterKey} onChange={setGutterKey}
        marks={gutters} step={null} tooltip={{ formatter: (value?: number) => value ? gutters[value] : '' }} />
    </div>
    <span>Vertical Gutter (px): </span>
    <div style={{ width: '50%' }}>
      <Slider min={0} max={Object.keys(vgutters).length - 1} value={vgutterKey} onChange={setVgutterKey}
        marks={vgutters} step={null} tooltip={{ formatter: (value?: number) => value ? vgutters[value] : '' }} />
    </div>
    <span>Column Count: </span>
    <div style={{ width: '50%', marginBottom: 48 }}>
      <Slider min={0} max={Object.keys(colCounts).length - 1} value={colCountKey} onChange={setColCountKey}
        marks={colCounts} step={null} tooltip={{ formatter: (value?: number) => value ? colCounts[value] : '' }} />
    </div>
    <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
      {cols}
      {cols}
    </Row>
    Another Row:
    <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{cols}</Row>
    <pre className="demo-code">{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}\n${colCode}</Row>`}</pre>
    <pre className="demo-code">{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}</Row>`}</pre>
  </>);
};

const { useBreakpoint } = Grid;
export const UseBreakpointHook: React.FC = () => {
  const screens = useBreakpoint();
  return (<>
    Current break point:{' '}
    {Object.entries(screens).filter((screen) => !!screen[1]).map((screen) => (
      <Tag color="blue" key={screen[0]}>{screen[0]}</Tag>
    ))}
  </>);
};

export default [
  {
    label: "Grid - Basic Grid",
    children: <BasicGrid />
  },
  {
    label: "Grid - Grid Gutter",
    children: <GridGutter />
  },
  {
    label: "Grid - Column offset",
    children: <ColumnOffset />
  },
  {
    label: "Grid - Grid sort",
    children: <GridSort />
  },
  {
    label: "Grid - Typesetting",
    children: <Typesetting />
  },
  {
    label: "Grid - Alignment",
    children: <Alignment />
  },
  {
    label: "Grid - Order",
    children: <Order />
  },
  {
    label: "Grid - Flex Stretch",
    children: <FlexStretch />
  },
  {
    label: "Grid - Responsive",
    children: <Responsive />
  },
  {
    label: "Grid - More responsive",
    children: <MoreResponsive />
  },
  {
    label: "Grid - Playground",
    children: <Playground />
  },
  {
    label: "Grid - useBreakpoint Hook",
    children: <UseBreakpointHook />
  },
]