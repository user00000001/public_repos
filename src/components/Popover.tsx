import React, { useMemo, useState } from "react";
import {
  Button,
  Divider,
  Popover,
  Segmented,
  Space,
} from "antd";

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
export const Basic: React.FC = () => (
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
);

export const ThreeWaysToTrigger: React.FC = () => (
  <Space wrap>
    <Popover content={content} title="Title" trigger="hover">
      <Button>Hover me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="focus">
      <Button>Focus me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>
  </Space>
);

const text = <span>Title</span>;
const buttonWidth = 70;
export const Placement: React.FC = () => (
  <div>
    <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
      <Popover placement="topLeft" title={text} content={content} trigger="click">
        <Button>TL</Button>
      </Popover>
      <Popover placement="top" title={text} content={content} trigger="click">
        <Button>Top</Button>
      </Popover>
      <Popover placement="topRight" title={text} content={content} trigger="click">
        <Button>TR</Button>
      </Popover>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
      <Popover placement="leftTop" title={text} content={content} trigger="click">
        <Button>LT</Button>
      </Popover>
      <Popover placement="left" title={text} content={content} trigger="click">
        <Button>Left</Button>
      </Popover>
      <Popover placement="leftBottom" title={text} content={content} trigger="click">
        <Button>LB</Button>
      </Popover>
    </div>
    <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
      <Popover placement="rightTop" title={text} content={content} trigger="click">
        <Button>RT</Button>
      </Popover>
      <Popover placement="right" title={text} content={content} trigger="click">
        <Button>Right</Button>
      </Popover>
      <Popover placement="rightBottom" title={text} content={content} trigger="click">
        <Button>RB</Button>
      </Popover>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
      <Popover placement="bottomLeft" title={text} content={content} trigger="click">
        <Button>BL</Button>
      </Popover>
      <Popover placement="bottom" title={text} content={content} trigger="click">
        <Button>Bottom</Button>
      </Popover>
      <Popover placement="bottomRight" title={text} content={content} trigger="click">
        <Button>BR</Button>
      </Popover>
    </div>
  </div>
);

export const Arrow: React.FC = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);
  return (
    <div className="demo">
      <Segmented
        options={['Show', 'Hide', 'Center']}
        onChange={(val) => {
          setShowArrow(val !== 'Hide');
          setArrowAtCenter(val === 'Center');
        }}
      />
      <Divider orientation="center">Content</Divider>
      <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
        <Popover placement="topLeft" title={text} content={content} arrow={mergedArrow}>
          <Button>TL</Button>
        </Popover>
        <Popover placement="top" title={text} content={content} arrow={mergedArrow}>
          <Button>Top</Button>
        </Popover>
        <Popover placement="topRight" title={text} content={content} arrow={mergedArrow}>
          <Button>TR</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, float: 'left' }}>
        <Popover placement="leftTop" title={text} content={content} arrow={mergedArrow}>
          <Button>LT</Button>
        </Popover>
        <Popover placement="left" title={text} content={content} arrow={mergedArrow}>
          <Button>Left</Button>
        </Popover>
        <Popover placement="leftBottom" title={text} content={content} arrow={mergedArrow}>
          <Button>LB</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <Popover placement="rightTop" title={text} content={content} arrow={mergedArrow}>
          <Button>RT</Button>
        </Popover>
        <Popover placement="right" title={text} content={content} arrow={mergedArrow}>
          <Button>Right</Button>
        </Popover>
        <Popover placement="rightBottom" title={text} content={content} arrow={mergedArrow}>
          <Button>RB</Button>
        </Popover>
      </div>
      <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover placement="bottomLeft" title={text} content={content} arrow={mergedArrow}>
          <Button>BL</Button>
        </Popover>
        <Popover placement="bottom" title={text} content={content} arrow={mergedArrow}>
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" title={text} content={content} arrow={mergedArrow}>
          <Button>BR</Button>
        </Popover>
      </div>
    </div>
  );
};

export const ControllingTheCloseOfTheDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={<a onClick={hide}>Close</a>}
      title="Title"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">Click me</Button>
    </Popover>
  );
};

export const HoverWithClickPopover: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hide = () => {
    setClicked(false);
    setHovered(false);
  };
  const handleHoverChange = (open: boolean) => {
    setHovered(open);
    setClicked(false);
  };
  const handleClickChange = (open: boolean) => {
    setHovered(false);
    setClicked(open);
  };
  const hoverContent = <div>This is hover content.</div>;
  const clickContent = <div>This is click content.</div>;
  return (
    <Popover
      style={{ width: 500 }}
      content={hoverContent}
      title="Hover title"
      trigger="hover"
      open={hovered}
      onOpenChange={handleHoverChange}
    >
      <Popover
        content={
          <div>
            {clickContent}
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Click title"
        trigger="click"
        open={clicked}
        onOpenChange={handleClickChange}
      >
        <Button>Hover and click / 悬停并单击</Button>
      </Popover>
    </Popover>
  );
};

export default [
  {
    label: "Popover - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "Popover - Three ways to trigger",
    children: React.createElement(ThreeWaysToTrigger),
  },
  {
    label: "Popover - Placement",
    children: React.createElement(Placement),
  },
  {
    label: "Popover - Arrow",
    children: React.createElement(Arrow),
  },
  {
    label: "Popover - Controlling the close of the dialog",
    children: React.createElement(ControllingTheCloseOfTheDialog),
  },
  {
    label: "Popover - Hover with click popover",
    children: React.createElement(HoverWithClickPopover),
  },
]