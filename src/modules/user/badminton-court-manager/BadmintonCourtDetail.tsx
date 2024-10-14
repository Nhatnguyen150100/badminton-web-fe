import { Breadcrumb, Tabs, TabsProps } from 'antd';
import * as React from 'react';
import CreateBadmintonCourt from './CreateBadmintonCourt';
import { Link, useParams } from 'react-router-dom';
import { DEFINE_ROUTERS_USER } from '../../../constants/routers-mapper';

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

export default function BadmintonCourtDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="w-full space-y-5">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={DEFINE_ROUTERS_USER.badmintonCourtManager}>Danh sách sân</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý sân cầu lông</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
