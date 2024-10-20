import * as React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../lib/store';
import { IBaseQuery } from '../../../types/query.types';
import { IUserBookingDetail } from '../../../types/userBooking.types';
import { Empty, Spin, Table, TableProps, Tooltip } from 'antd';
import { userBookingService } from '../../../services';
import BaseSearch from '../../../components/base/BaseSearch';
import Visibility from '../../../components/base/visibility';
import { CompassOutlined } from '@ant-design/icons';
import {
  onGetDistrictName,
  onGetWardName,
} from '../../../utils/functions/on-location-name';
import { formatDate } from '../../../utils/functions/format-date';
import { formatCurrencyVND } from '../../../utils/functions/format-money';
import { onChooseStatus } from '../../../utils/on-choose-status';

export default function ListCourtBooking() {
  const [listUserBooking, setListUserBooking] = React.useState<
    IUserBookingDetail[]
  >([]);

  const user = useSelector((state: IRootState) => state.user);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<IBaseQuery>({
    limit: 5,
    page: 1,
  });

  const handleGetList = async (queryPram = query) => {
    try {
      setLoading(true);
      const rs = await userBookingService.getListUserBookingByUser(
        user.id,
        queryPram,
      );
      setListUserBooking(rs.data.content);
      setQuery({ ...queryPram, total: rs.data.totalCount });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.id && !query.nameLike) handleGetList();
  }, [user.id, query.nameLike]);

  const columns: TableProps<IUserBookingDetail>['columns'] = [
    {
      title: 'Số thứ tự',
      key: 'index',
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: 'Tên sân cầu',
      dataIndex: 'courtNumber',
      key: 'courtNumber',
      render: (_, record) => (
        <span className="text-xl font-semibold">
          {record.schedule.badmintonCourt.name}
        </span>
      ),
    },
    {
      title: 'Số điện thoại chủ sân',
      dataIndex: 'courtNumber',
      key: 'courtNumber',
      render: (_, record) => (
        <Tooltip title="Nhấn để gọi">
          <a
            href={`tel:${record.schedule.badmintonCourt.user?.phoneNumber}`}
            className="text-lg font-semibold text-blue-500 underline"
          >
            {record.schedule.badmintonCourt.user?.phoneNumber}
          </a>
        </Tooltip>
      ),
    },
    {
      title: 'Địa chỉ sân cầu',
      dataIndex: 'courtNumber',
      key: 'courtNumber',
      render: (_, record) => (
        <div className="flex flex-row justify-start items-center">
          <span>{`${onGetDistrictName(
            record.schedule.badmintonCourt?.district,
          )} - ${onGetWardName(
            record.schedule.badmintonCourt?.district,
            record.schedule.badmintonCourt?.ward,
          )} - ${record.schedule.badmintonCourt?.address}`}</span>
        </div>
      ),
    },
    {
      title: 'Thời gian thuê',
      dataIndex: 'startTime',
      align: 'center',
      key: 'startTime',
      render: (_, record) => (
        <div className="flex flex-row justify-start items-center space-x-1">
          <span>{record.schedule.timeBooking.startTime}</span>
          <span>đến</span>
          <span>{record.schedule.timeBooking.endTime}</span>
        </div>
      ),
    },
    {
      title: 'Ngày cho thuê',
      dataIndex: 'appointmentDate',
      align: 'center',
      key: 'appointmentDate',
      render: (_, record) => (
        <span className="text-sm font-base">
          {formatDate(record.schedule.appointmentDate)}
        </span>
      ),
    },
    {
      title: 'Giá tiền thuê',
      dataIndex: 'constBooking',
      align: 'center',
      key: 'constBooking',
      render: (_, record) => (
        <span className="text-sm font-base underline text-blue-600">
          {formatCurrencyVND(record.schedule.constBooking)}
        </span>
      ),
    },
    {
      title: 'Trạng thái của lịch',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (_, record) => <span>{onChooseStatus(record.status)}</span>,
    },
  ];

  return (
    <div className="w-full min-h-[320px] flex flex-col justify-start items-center space-y-5">
      <div className="w-full flex flex-row justify-between items-center">
        <BaseSearch
          value={query.nameLike!}
          placeholder="Nhập để tìm kiếm"
          onHandleChange={(value) => {
            setQuery({ ...query, nameLike: value });
          }}
          onSearch={() => handleGetList()}
        />
      </div>
      <Visibility
        visibility={Boolean(listUserBooking.length)}
        suspenseComponent={loading ? <Spin /> : <Empty />}
      >
        <div className="w-full">
          <Table<IUserBookingDetail>
            rowKey="id"
            columns={columns}
            className="cursor-pointer"
            dataSource={listUserBooking}
            // onRow={(record) => ({
            //   onClick: () => handleClickRow(record),
            // })}
            pagination={{
              current: query.page,
              pageSize: query.limit,
              total: query.total ?? 0,
              onChange: (page, limit) => {
                const newQuery = {
                  ...query,
                  page,
                  limit,
                };
                setQuery(newQuery);
                handleGetList(newQuery);
              },
            }}
          />
        </div>
      </Visibility>
    </div>
  );
}
