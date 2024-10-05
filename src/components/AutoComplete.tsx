import React, { useState } from "react";
import {
  type SelectProps,
  AutoComplete,
  Input,
  Space,
} from "antd";
import { CloseSquareFilled, UserOutlined } from "@ant-design/icons";

const mockVal = (str: string, repeat = 1) => ({ value: str.repeat(repeat) });
export const BasicUsage: React.FC = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);
  const getPanelValue = (searchText: string) => !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
  const onSelect = (data: string) => { console.log('onSelect', data) };
  const onChange = (data: string) => setValue(data);
  return (<>
    <AutoComplete
      options={options}
      style={{ width: 200 }}
      onSelect={onSelect}
      onSearch={(text) => setOptions(getPanelValue(text))}
      placeholder="input here"
    />
    <br />
    <br />
    <AutoComplete
      value={value}
      options={anotherOptions}
      style={{ width: 200 }}
      onSelect={onSelect}
      onSearch={(text) => setAnotherOptions(getPanelValue(text))}
      onChange={onChange}
      placeholder="control mode"
    />
  </>);
}

export const Customized: React.FC = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const handleSearch = (value: string) => {
    let res: { value: string; label: string }[] = [];
    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
        value: `${value}@${domain}`,
        label: `${value}@${domain}`,
      }));
    }
    setOptions(res);
  };
  return (
    <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      placeholder="input here"
      options={options}
    />
  );
};

const { TextArea } = Input;
export const CustomizeInputComponent: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const handleSearch = (value: string) => {
    setOptions(
      !value ? [] : [{ value }, { value: value + value }, { value: value + value + value }],
    );
  };
  const handleKeyPress = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log('handleKeyPress', ev);
  };
  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };
  return (
    <AutoComplete
      options={options}
      style={{ width: 200 }}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <TextArea
        placeholder="input here"
        className="custom"
        style={{ height: 50 }}
        onKeyPress={handleKeyPress}
      />
    </AutoComplete>
  );
};

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];
export const NoneCaseSensitiveAutoComplete: React.FC = () => (
  <AutoComplete
    style={{ width: 200 }}
    options={options}
    placeholder="try to type `b`"
    filterOption={(inputValue, option) =>
      option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
);

const renderTitle = (title: string) => (
  <span>
    {title}
    <a
      style={{ float: 'right' }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);
const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});
const options1 = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];
export const LookupPatternsCertainCategory: React.FC = () => (
  <AutoComplete
    popupClassName="certain-category-search-dropdown"
    dropdownMatchSelectWidth={500}
    style={{ width: 250 }}
    options={options1}
  >
    <Input.Search size="large" placeholder="input here" />
  </AutoComplete>
);

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
export const LookupPatternsUncertainCategory: React.FC = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search size="large" placeholder="input here" enterButton />
    </AutoComplete>
  );
};

export const Status: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);
  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <AutoComplete
        options={options}
        onSearch={(text) => setOptions(getPanelValue(text))}
        status="error"
        style={{ width: 200 }}
      />
      <AutoComplete
        options={anotherOptions}
        onSearch={(text) => setAnotherOptions(getPanelValue(text))}
        status="warning"
        style={{ width: 200 }}
      />
    </Space>
  );
};

export const Borderless: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  return (
    <AutoComplete
      options={options}
      style={{ width: 200 }}
      placeholder="Borderless"
      onSearch={(text) => setOptions(getPanelValue(text))}
      onSelect={globalThis.console.log}
      bordered={false}
    />
  );
};

export const CustomizeClearButton: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSearch={(text) => setOptions(getPanelValue(text))}
        placeholder="UnClearable"
        allowClear={false}
      />
      <br />
      <br />
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSearch={(text) => setOptions(getPanelValue(text))}
        placeholder="Customized clear icon"
        allowClear={{ clearIcon: <CloseSquareFilled /> }}
      />
    </>
  );
};

export default [
  {
    label: "AutoComplete - Basic Usage",
    children: React.createElement(BasicUsage),
  },
  {
    label: "AutoComplete - Customized",
    children: React.createElement(Customized),
  },
  {
    label: "AutoComplete - Customize Input Component",
    children: React.createElement(CustomizeInputComponent),
  },
  {
    label: "AutoComplete - Non-case-sensitive AutoComplete",
    children: React.createElement(NoneCaseSensitiveAutoComplete),
  },
  {
    label: "AutoComplete - Lookup-Patterns - Certain Category",
    children: React.createElement(LookupPatternsCertainCategory),
  },
  {
    label: "AutoComplete - Lookup-Patterns - Uncertain Category",
    children: React.createElement(LookupPatternsUncertainCategory),
  },
  {
    label: "AutoComplete - Status",
    children: React.createElement(Status),
  },
  {
    label: "AutoComplete - Borderless",
    children: React.createElement(Borderless),
  },
  {
    label: "AutoComplete - Customize clear button",
    children: React.createElement(CustomizeClearButton),
  },
]