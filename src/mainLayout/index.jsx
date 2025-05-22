import React, { useState } from 'react';
import { Card } from 'antd';
import Scroll from '../scroll/scroll';
import PaginationComp from '../pagination/pagination';
import MoreProduct from '../More-products/MoreProduct';

const tabListNoTitle = [
  {
    key: 'pagination',
    label: 'pagination',
  },
  {
    key: 'scroll',
    label: 'scroll',
  },
  {
    key: 'MoreProduct',
    label: 'more 10 products',
  },
];
const contentListNoTitle = {
  scroll: <Scroll/>,
  pagination:<PaginationComp/>,
  MoreProduct: <MoreProduct/>,
};
const MainLayout = () => {
  const [activeTabKey2, setActiveTabKey2] = useState('app');

  const onTab2Change = key => {
    setActiveTabKey2(key);
  };
  return (
    <>
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<a href="#">More</a>}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};
export default MainLayout;