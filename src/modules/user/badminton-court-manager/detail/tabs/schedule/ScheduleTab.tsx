import * as React from 'react';
import { ISchedule } from '../../../../../../types/schedule.types';
import { IBaseQuery } from '../../../../../../types/query.types';
import { Button, Empty, FormProps, Modal, Spin, Table, TableProps } from 'antd';
import { courtNumberService, scheduleService, timeBookingService } from '../../../../../../services';
import { toast } from 'react-toastify';
import { formatDate } from '../../../../../../utils/functions/format-date';
import { onChooseStatusSchedule } from '../../../../../../utils/on-choose-status-schedule';
import { IScheduleStatusLabel } from '../../../../../../types/status.types';
import { DeleteOutlined } from '@ant-design/icons';
import BaseSearch from '../../../../../../components/base/BaseSearch';
import Visibility from '../../../../../../components/base/visibility';
import ScheduleForm from './scheduleForm';
import { formatCurrencyVND } from '../../../../../../utils/functions/format-money';
import { ITimeBooking } from '../../../../../../types/timeBooking.types';
import { ICourtNumber } from '../../../../../../types/courtNumber.types';


interface IProps {
  id: string;
}

const ScheduleTab: React.FC<IProps> = ({ id }) => {
  const [listSchedule, setListSchedule] = React.useState<ISchedule[]>([]);
  const [listTimeBooking, setListTimeBooking] = React.useState<ITimeBooking[]>([]);
  console.log("🚀 ~ listTimeBooking:", listTimeBooking)
  const [listCourtNumber, setListCourtNumber] = React.useState<ICourtNumber[]>([]);
  console.log("🚀 ~ listCourtNumber:", listCourtNumber)
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<IBaseQuery>({
    limit: 5,
    page: 1,
  });
  const [editSchedule, setEditSchedule] = React.useState<ISchedule>();
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  const handleDeleteSchedule = async (_schedule: ISchedule) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa lịch này',
      content: `Lịch sân : ${_schedule.courtNumber.name} vào lúc ${_schedule.timeBooking.startTime} đến ${_schedule.timeBooking.endTime}`,
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      style: {
        top: '50%',
        transform: 'translateY(-50%)',
      },
      onOk: async () => {
        try {
          setLoading(true);
          const rs = await scheduleService.deleteSchedule(
            _schedule.id,
          );
          handleGetList();
          toast.success(rs.message);
        } catch (error: any) {
          toast.success(error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns: TableProps<ISchedule>['columns'] = [
    {
      title: 'Số thứ tự',
      key: 'index',
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: 'Tên sân cầu',
      dataIndex: 'courtNumber',
      align: 'center',
      key: 'courtNumber',
      render: (_, record) => <span className="text-xl font-semibold">{record.courtNumber.name}</span>,
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      align: 'center',
      key: 'startTime',
      render: (_, record) => (
        <span className="text-sm font-base">{record.timeBooking.startTime}</span>
      ),
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      align: 'center',
      key: 'endTime',
      render: (_, record) => (
        <span className="text-sm font-base">{record.timeBooking.endTime}</span>
      ),
    },
    {
      title: 'Giá tiền thuê',
      dataIndex: 'constBooking',
      align: 'center',
      key: 'constBooking',
      render: (constBooking: number) => (
        <span className="text-sm font-base underline text-blue-600">{formatCurrencyVND(constBooking)}</span>
      ),
    },
    {
      title: 'Ngày lịch đặt',
      dataIndex: 'appointmentDate',
      align: 'center',
      key: 'appointmentDate',
      render: (appointmentDate: string) => (
        <span className="text-sm font-base">{formatDate(appointmentDate)}</span>
      ),
    },
    {
      title: 'Ngày tạo lịch',
      dataIndex: 'createdAt',
      align: 'center',
      key: 'createdAt',
      render: (createdAt: string) => (
        <span className="text-sm font-base">{formatDate(createdAt)}</span>
      ),
    },
    {
      title: 'Trạng thái của lịch',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (status: IScheduleStatusLabel) => (
        <span>{onChooseStatusSchedule(status)}</span>
      ),
    },
    {
      title: 'Xóa lịch',
      key: 'deleteSchedule',
      align: 'center',
      dataIndex: 'deleteSchedule',
      render: (_, _schedule: ISchedule) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteSchedule(_schedule);
          }}
          className="ms-3"
          variant="solid"
          color="danger"
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const onFinish: FormProps<{
    name: string;
  }>['onFinish'] = async (values) => {
    const data = { ...values };
    if (!id) {
      toast.error('User id không tìm thấy');
      return;
    }
    try {
      setLoading(true);
      const rs = editSchedule?.id
        ? await scheduleService.updateSchedule(editSchedule!.id, data)
        : await scheduleService.createSchedule({
            ...data,
            badmintonCourtId: id,
          });
      toast.success(rs.message);
      handleGetList();
      setIsOpenModal(false);
      setEditSchedule(undefined);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetList = async () => {
    try {
      setLoading(true);
      const rs = await scheduleService.getListSchedule(id, query);
      setListSchedule(rs.data.content);
      setQuery({ ...query, total: rs.data.totalCount });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetListCourtAndTime = async () => {
    try {
      setLoading(true);
      const courts = await courtNumberService.getListCourtNumber(id, {});
      const times = await timeBookingService.getListTimeBooking(id, {});
      setListTimeBooking(times.data.content);
      setListCourtNumber(courts.data.content);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    handleGetListCourtAndTime();
  }, [])

  React.useEffect(() => {
    if (id && !query.nameLike) handleGetList();
  }, [id, query.nameLike]);

  const handleClickRow = (record: ISchedule) => {
    setEditSchedule(record);
    setIsOpenModal(true);
  };

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
        <Button
          type="primary"
          variant="filled"
          className="px-10 py-3 text-end"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          Thêm lịch mới
        </Button>
      </div>
      <Visibility
        visibility={Boolean(listSchedule.length)}
        suspenseComponent={loading ? <Spin /> : <Empty />}
      >
        <div className="w-full">
          <Table<ISchedule>
            rowKey="id"
            columns={columns}
            className="cursor-pointer"
            dataSource={listSchedule}
            onRow={(record) => ({
              onClick: () => handleClickRow(record),
            })}
            pagination={{
              current: query.page,
              pageSize: query.limit,
              total: query.total ?? 0,
              onChange: (page, limit) => {
                setQuery((pre) => ({
                  ...pre,
                  page,
                  limit,
                }));
                handleGetList();
              },
            }}
          />
        </div>
      </Visibility>
      <Visibility visibility={isOpenModal}>
        <ScheduleForm
          listTimeBooking={listTimeBooking}
          listCourtNumber={listCourtNumber}
          isOpenModal={isOpenModal}
          editSchedule={editSchedule}
          onFinish={onFinish}
          handleClose={() => {
            setIsOpenModal(false);
            setEditSchedule(undefined);
          }}
        />
      </Visibility>
    </div>
  );
};

export default React.memo(ScheduleTab);