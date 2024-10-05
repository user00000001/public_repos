import { Tabs, TabsProps, theme } from "antd";
import { items } from "./components/components";
import StickyBox from "react-sticky-box";

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );
  return <Tabs defaultActiveKey="0" renderTabBar={renderTabBar} items={items} />;
};

export default App;
