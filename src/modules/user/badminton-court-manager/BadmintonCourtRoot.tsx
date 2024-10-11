import { Tabs, TabsProps } from 'antd';
import * as React from 'react'
import CreateBadmintonCourt from './CreateBadmintonCourt';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Quản lý thông tin sân cầu lông',
    children: <CreateBadmintonCourt />,
  },
  // {
  //   key: '2',
  //   label: 'Learn progress',
  //   children: <ProcessTest />,
  // },
];

export default function BadmintonCourtRoot() {
  return (
    <div className="w-full">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}