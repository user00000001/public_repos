import {
  type PaginationProps,
  Pagination,
} from "antd";
import React, { useState } from "react";

export const Basic: React.FC = () => <Pagination defaultCurrent={1} total={50} />;

export const More: React.FC = () => <Pagination defaultCurrent={6} total={500} />;

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
  console.log(current, pageSize);
};
export const Changer: React.FC = () => (<>
  <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500}></Pagination>
  <br />
  <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} disabled></Pagination>
</>);

const onChange: PaginationProps['onChange'] = (pageNumber) => {
  console.log('Page: ', pageNumber);
};
export const Jumper: React.FC = () => (<>
  <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange}></Pagination>
  <br />
  <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} disabled></Pagination>
</>);

const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;
export const MiniSize: React.FC = () => (<>
  <Pagination size="small" total={50}></Pagination>
  <Pagination size="small" total={50} showSizeChanger showQuickJumper></Pagination>
  <Pagination size="small" total={50} showTotal={showTotal}></Pagination>
  <Pagination
    size="small"
    total={50}
    disabled
    showTotal={showTotal}
    showSizeChanger
    showQuickJumper
  ></Pagination>
</>);

export const SimpleMode: React.FC = () => (<>
  <Pagination simple defaultCurrent={2} total={50}></Pagination>
  <br />
  <Pagination simple defaultCurrent={2} total={50} disabled></Pagination>
</>);

export const Controlled: React.FC = () => {
  const [current, setCurrent] = useState(3);
  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return <Pagination current={current} onChange={onChange} total={50} />;
};

export const TotalNumber: React.FC = () => (
  <>
    <Pagination
      total={85}
      showTotal={(total) => `Total ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
    <br />
    <Pagination
      total={85}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
  </>
);

export const ShowAll: React.FC = () => (
  <Pagination
    total={85}
    showSizeChanger
    showQuickJumper
    showTotal={(total) => `Total ${total} items`}
  />
);

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};
export const PrevAndNext: React.FC = () => <Pagination total={500} itemRender={itemRender} />;

export default [
  {
    label: "Pagination - Basic",
    children: React.createElement(Basic),
  },
  {
    label: "Pagination - More",
    children: React.createElement(More),
  },
  {
    label: "Pagination - Changer",
    children: React.createElement(Changer),
  },
  {
    label: "Pagination - Jumper",
    children: React.createElement(Jumper),
  },
  {
    label: "Pagination - Mini size",
    children: React.createElement(MiniSize),
  },
  {
    label: "Pagination - Simple mode",
    children: React.createElement(SimpleMode),
  },
  {
    label: "Pagination - Controlled",
    children: React.createElement(Controlled),
  },
  {
    label: "Pagination - Total number",
    children: React.createElement(TotalNumber),
  },
  {
    label: "Pagination - Show All",
    children: React.createElement(ShowAll),
  },
  {
    label: "Pagination - Prev and next",
    children: React.createElement(PrevAndNext),
  },
]