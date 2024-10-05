import React, { useState } from "react";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Space, TimePicker } from 'antd';

dayjs.extend(customParseFormat);

const onChange = (time: Dayjs | null, timeString: string) => {
  console.log(time, timeString);
};
export const Basic: React.FC = () => (
  <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
);

export const UnderControl: React.FC = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const onChange = (time: Dayjs | null) => {
    setValue(time);
  };
  return <TimePicker value={value} onChange={onChange} />;
};

export const ThreeSizes: React.FC = () => (
  <Space wrap>
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="large" />
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} />
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="small" />
  </Space>
);

export const Disabled: React.FC = () => <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} disabled />;

const format = 'HH:mm';
export const HourAndMinute: React.FC = () => <TimePicker defaultValue={dayjs('12:08', format)} format={format} />;

export const IntervalOption: React.FC = () => <TimePicker minuteStep={15} secondStep={10} hourStep={1} />;

export const Addon: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <TimePicker
      open={open}
      onOpenChange={setOpen}
      renderExtraFooter={() => (
        <Button size="small" type="primary" onClick={() => setOpen(false)}>
          OK
        </Button>
      )}
    />
  );
};

export const _12Hours: React.FC = () => (
  <Space wrap>
    <TimePicker use12Hours onChange={onChange} />
    <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} />
    <TimePicker use12Hours format="h:mm a" onChange={onChange} />
  </Space>
);

export const TimeRangePicker: React.FC = () => <TimePicker.RangePicker />

const { RangePicker } = TimePicker;
export const BorderedLess: React.FC = () => (
  <>
    <TimePicker bordered={false} />
    <RangePicker bordered={false} />
  </>
);

export const Status: React.FC = () => (
  <Space direction="vertical">
    <TimePicker status="error" />
    <TimePicker status="warning" />
    <TimePicker.RangePicker status="error" />
    <TimePicker.RangePicker status="warning" />
  </Space>
);

export default [
  {
    label: "TimePicker - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "TimePicker - Under Control",
    children: React.createElement(UnderControl),
  },
  {
    label: "TimePicker - Three Sizes",
    children: React.createElement(ThreeSizes),
  },
  {
    label: "TimePicker - Disabled",
    children: React.createElement(Disabled),
  },
  {
    label: "TimePicker - Hour and minute",
    children: React.createElement(HourAndMinute),
  },
  {
    label: "TimePicker - interval option",
    children: React.createElement(IntervalOption),
  },
  {
    label: "TimePicker - Addon",
    children: React.createElement(Addon),
  },
  {
    label: "TimePicker - 12 hours",
    children: React.createElement(_12Hours),
  },
  {
    label: "TimePicker - Time Range Picker",
    children: React.createElement(TimeRangePicker),
  },
  {
    label: "TimePicker - Bordered-less",
    children: React.createElement(BorderedLess),
  },
  {
    label: "TimePicker - Status",
    children: React.createElement(Status),
  },
]