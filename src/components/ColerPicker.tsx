import {
  ColorPicker,
  Space,
  theme,
  App,
  message,
  Button,
  Row,
  Col,
  Divider,
} from "antd";
import React, { useMemo, useState } from "react";
import {
  type Color,
  type ColorPickerProps,
} from "antd/es/color-picker"
import { 
  DownOutlined, 
} from "@ant-design/icons";

export const BasicUsage: React.FC = () => <ColorPicker />

export const TriggerSize: React.FC = () => (
  <Space>
    <Space direction="vertical">
      <ColorPicker size="small" />
      <ColorPicker />
      <ColorPicker size="large" />
    </Space>
    <Space direction="vertical">
      <ColorPicker size="small" showText />
      <ColorPicker showText />
      <ColorPicker size="large" showText />
    </Space>
  </Space>
);

export const ControlledMode: React.FC = () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);
  return <ColorPicker value={color} onChange={setColor} />
};

export const ColorChangeCompleted: React.FC = () => {
  // const { message } = App.useApp();
  const [value, setValue] = useState<ColorPickerProps['value']>('#1677ff');
  return (
    <App>
      <ColorPicker value={value} onChangeComplete={(color) => {
        setValue(color);
        message.success(`The selected color is ${color.toHexString()}`);
      }} />
    </App>
  );
};

export const RenderingTriggerText: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Space direction="vertical">
      <ColorPicker showText />
      <ColorPicker showText={(color) => <Space><span>Custom Text ({color.toHexString()})</span></Space>} />
      <ColorPicker open={open} onOpenChange={setOpen} showText={() => (
        <DownOutlined rotate={open ? 180 : 0} style={{
          color: 'rgba(0,0,0,0.25)'
        }} />
      )} />
    </Space>
  );
};

export const Disable: React.FC = () => <ColorPicker showText disabled/>

export const DisableAlpha: React.FC = () => <ColorPicker showText disabledAlpha/>

export const ClearColor: React.FC = () => <ColorPicker allowClear/>

export const CustomTrigger: React.FC = () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color|string>(token.colorPrimary);
  const bgColor = useMemo<string>(()=>(typeof color === 'string' ? color : color.toHexString()), [color]);
  const btnStyle: React.CSSProperties = {
    backgroundColor: bgColor,
  };
  return (
    <ColorPicker value={color} onChange={setColor}>
      <Button type="primary" style={btnStyle}>
        open
      </Button>
    </ColorPicker>
  );
};

export const CustomTriggerEvent: React.FC = () => <ColorPicker trigger="hover"/>

export const CustomFormat: React.FC = () => {
  const [colorHex, setColorHex] = useState<Color | string>('#1677ff');
  const [colorHsb, setColorHsb] = useState<Color | string>('hsb(215, 91%, 100%)');
  const [colorRgb, setColorRgb] = useState<Color | string>('rgb(22, 119, 255)');
  const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');
  const [formatHsb, setFormatHsb] = useState<ColorPickerProps['format']>('hsb');
  const [formatRgb, setFormatRgb] = useState<ColorPickerProps['format']>('rgb');

  const hexString = useMemo(
    () => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()),
    [colorHex],
  );
  const hsbString = useMemo(
    () => (typeof colorHsb === 'string' ? colorHsb : colorHsb.toHsbString()),
    [colorHsb],
  );
  const rgbString = useMemo(
    () => (typeof colorRgb === 'string' ? colorRgb : colorRgb.toRgbString()),
    [colorRgb],
  );
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row align="middle">
        <Space>
          <Col>
            <ColorPicker
              format={formatHex}
              value={colorHex}
              onChange={setColorHex}
              onFormatChange={setFormatHex}
            />
          </Col>
          <Col>
            HEX: <span>{hexString}</span>
          </Col>
        </Space>
      </Row>
      <Row align="middle">
        <Space>
          <Col>
            <ColorPicker
              format={formatHsb}
              value={colorHsb}
              onChange={setColorHsb}
              onFormatChange={setFormatHsb}
            />
          </Col>
          <Col>
            HSB: <span>{hsbString}</span>
          </Col>
        </Space>
      </Row>
      <Row align="middle">
        <Space>
          <Col>
            <ColorPicker
              format={formatRgb}
              value={colorRgb}
              onChange={setColorRgb}
              onFormatChange={setFormatRgb}
            />
          </Col>
          <Col>
            RGB: <span>{rgbString}</span>
          </Col>
        </Space>
      </Row>
    </Space>
  );
};

export const PresetColors: React.FC = () => (
  <ColorPicker
    presets={[
      {
        label: 'Recommended',
        colors: [
          '#000000',
          '#000000E0',
          '#000000A6',
          '#00000073',
          '#00000040',
          '#00000026',
          '#0000001A',
          '#00000012',
          '#0000000A',
          '#00000005',
          '#F5222D',
          '#FA8C16',
          '#FADB14',
          '#8BBB11',
          '#52C41A',
          '#13A8A8',
          '#1677FF',
          '#2F54EB',
          '#722ED1',
          '#EB2F96',
          '#F5222D4D',
          '#FA8C164D',
          '#FADB144D',
          '#8BBB114D',
          '#52C41A4D',
          '#13A8A84D',
          '#1677FF4D',
          '#2F54EB4D',
          '#722ED14D',
          '#EB2F964D',
        ],
      },
      {
        label: 'Recent',
        colors: [],
      },
    ]}
  />
);

export const CustomRenderPanel: React.FC = () => (
  <Space direction="vertical">
    <Row align="middle">
      <Space>
        <span>Add title: </span>
        <Col>
          <ColorPicker
            panelRender={(panel) => (
              <div className="custom-panel">
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(0, 0, 0, 0.88)',
                    lineHeight: '20px',
                    marginBottom: 8,
                  }}
                >
                  Color Picker
                </div>
                {panel}
              </div>
            )}
          />
        </Col>
      </Space>
    </Row>
    <Row align="middle">
      <Space>
        <span>Horizontal layout: </span>
        <Col>
          <ColorPicker
            styles={{
              popupOverlayInner: {
                width: 468 + 24,
              },
            }}
            presets={[
              {
                label: 'Recommended',
                colors: [
                  '#000000',
                  '#000000E0',
                  '#000000A6',
                  '#00000073',
                  '#00000040',
                  '#00000026',
                  '#0000001A',
                  '#00000012',
                  '#0000000A',
                  '#00000005',
                  '#F5222D',
                  '#FA8C16',
                  '#FADB14',
                  '#8BBB11',
                  '#52C41A',
                  '#13A8A8',
                  '#1677FF',
                  '#2F54EB',
                  '#722ED1',
                  '#EB2F96',
                  '#F5222D4D',
                  '#FA8C164D',
                  '#FADB144D',
                  '#8BBB114D',
                  '#52C41A4D',
                  '#13A8A84D',
                  '#1677FF4D',
                  '#2F54EB4D',
                  '#722ED14D',
                  '#EB2F964D',
                ],
              },
              {
                label: 'Recent',
                colors: [
                  '#F5222D4D',
                  '#FA8C164D',
                  '#FADB144D',
                  '#8BBB114D',
                  '#52C41A4D',
                  '#13A8A84D',
                ],
              },
            ]}
            panelRender={(_, { components: { Picker, Presets } }) => (
              <div
                className="custom-panel"
                style={{
                  display: 'flex',
                  width: 468,
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <Presets />
                </div>
                <Divider
                  type="vertical"
                  style={{
                    height: 'auto',
                  }}
                />
                <div
                  style={{
                    width: 234,
                  }}
                >
                  <Picker />
                </div>
              </div>
            )}
          />
        </Col>
      </Space>
    </Row>
  </Space>
);

export default [
  {
    label: "ColorPicker - Basic Usage",
    children: React.createElement(BasicUsage),
  },
  {
    label: "ColorPicker - Trigger size",
    children: React.createElement(TriggerSize),
  },
  {
    label: "ColorPicker - controlled mode",
    children: React.createElement(ControlledMode),
  },
  {
    label: "ColorPicker - Color change completed",
    children: React.createElement(ColorChangeCompleted),
  },
  {
    label: "ColorPicker - Rendering Trigger Text",
    children: React.createElement(RenderingTriggerText),
  },
  {
    label: "ColorPicker - Disable",
    children: React.createElement(Disable),
  },
  {
    label: "ColorPicker - Disable Alpha",
    children: React.createElement(DisableAlpha),
  },
  {
    label: "ColorPicker - Clear Color",
    children: React.createElement(ClearColor),
  },
  {
    label: "ColorPicker - Custom Trigger",
    children: React.createElement(CustomTrigger),
  },
  {
    label: "ColorPicker - Custom Trigger Event",
    children: React.createElement(CustomTriggerEvent),
  },
  {
    label: "ColorPicker - Color Format",
    children: React.createElement(CustomFormat),
  },
  {
    label: "ColorPicker - Preset Colors",
    children: React.createElement(PresetColors),
  },
  {
    label: "ColorPicker - Custom Render Panel",
    children: React.createElement(CustomRenderPanel),
  },
]