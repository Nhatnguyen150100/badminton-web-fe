import * as React from 'react';
import { IBadmintonCourt } from '../../../types/badmintonCourt.types';
import { IBaseQuery } from '../../../types/query.types';
import Visibility from '../../../components/base/visibility';
import { Button, Empty, message, Select, Spin } from 'antd';
import {
  badmintonCourtService,
  badmintonGatherService,
} from '../../../services';
import { CompassOutlined, InfoOutlined } from '@ant-design/icons';
import {
  onGetDistrictName,
  onGetWardName,
} from '../../../utils/functions/on-location-name';
import CourtMapPost from '../../../components/base/CourtMapPost';
import DATA from '../../../mock/dvhc.json';
import { ISelectType } from '../../../types/select.types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../lib/store';
import { IBadmintonGather } from '../../../types/badmintonGather.types';
import { DEFINE_ROUTERS_USER } from '../../../constants/routers-mapper';

export default function ListBadmintonGatherPost() {
  const user = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();
  const [listGather, setListGather] = React.useState<IBadmintonGather[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<IBaseQuery>({
    limit: 5,
    page: 1,
  });

  const handleGetList = async () => {
    try {
      setLoading(true);
      const rs = await badmintonGatherService.getBadmintonGatherList(query);
      setListGather(rs.data.content);
      setQuery({ ...query, total: rs.data.totalCount });
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const listMarkers = React.useMemo(() => {
    return listGather.map((gather) => ({
      id: gather.id,
      position: [gather.lat, gather.lang],
      address: gather.address,
    }));
  }, [listGather]);

  React.useEffect(() => {
    handleGetList();
  }, [query.limit]);

  const districtData = DATA.level2s.map((district): ISelectType => {
    return {
      label: district.name,
      value: district.level2_id,
    };
  });

  const wardData = React.useMemo(() => {
    if (!query.district) return [];
    const currentDistrict = DATA.level2s.find(
      (districtData) => districtData.level2_id === query.district,
    );
    return currentDistrict?.level3s.map(
      (wardData): ISelectType => ({
        label: wardData.name,
        value: wardData.level3_id,
      }),
    );
  }, [query.district]);

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-5 w-full">
        <div className="space-x-3">
          <Select
            className="min-w-[120px]"
            placeholder="Lọc theo quận/huyện"
            allowClear
            onClear={() => {
              setQuery(
                (pre) => ({ ...pre, ward: null } as unknown as IBaseQuery),
              );
            }}
            value={query.district}
            onChange={(value) =>
              setQuery((pre) => ({ ...pre, district: value }))
            }
          >
            {districtData.map((district) => (
              <Select.Option key={district.value} value={district.value}>
                {district.label}
              </Select.Option>
            ))}
          </Select>
          <Select
            className="min-w-[120px]"
            disabled={!query?.district}
            placeholder="Lọc theo phường/xã"
            allowClear
            onChange={(value) => setQuery((pre) => ({ ...pre, ward: value }))}
            value={query.ward}
          >
            {wardData!.map((ward) => (
              <Select.Option key={ward.value} value={ward.value}>
                {ward.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Button
          type="primary"
          className="min-w-[120px]"
          onClick={handleGetList}
        >
          Tìm kiếm
        </Button>
      </div>
      <div
        className={`h-[calc(100vh-230px)] grid gap-x-3 ${
          Boolean(listGather.length) ? 'grid-cols-2' : 'grid-cols-1 w-full'
        }`}
      >
        <Visibility
          visibility={Boolean(listGather.length)}
          suspenseComponent={loading ? <Spin /> : <Empty />}
        >
          <div className="h-full overflow-y-auto overflow-x-hidden flex-col justify-center items-start space-y-3">
            {listGather.map((gather) => (
              <div
                key={gather.id}
                onClick={() => {
                  if (!user.id) {
                    message.error('Vui lòng đăng nhập để xem thông tin chi tiết');
                    return;
                  }
                  navigate(
                    DEFINE_ROUTERS_USER.gatherPostDetail.replace(
                      ':id',
                      gather.id,
                    ),
                  );
                }}
                className="flex flex-row justify-start items-center rounded-2xl shadow-xl p-5 space-x-5 cursor-pointer border border-solid hover:border-dashed hover:border hover:border-blue-500"
              >
                <img
                  className="max-h-[120px] max-w-[260px] rounded-xl object-contain"
                  src={gather.imgCourt}
                  alt="Ảnh sân"
                />
                <div className="flex flex-col justify-start items-start space-y-1">
                  <h1 className="capitalize text-xl font-bold">
                    {gather.nameClub}
                  </h1>
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <img
                      className="h-[26px]"
                      alt="location"
                      src="/icons/location.png"
                    />
                    <span>{`${onGetDistrictName(
                      gather.district,
                    )} - ${onGetWardName(gather.district, gather.ward)} - ${
                      gather.address
                    }`}</span>
                  </div>
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <img
                      className="h-[26px]"
                      alt="notes"
                      src="/icons/notes.png"
                    />
                    <span className="whitespace-pre-wrap capitalize">
                      {gather.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center">
              <Visibility
                visibility={
                  query?.total ? listGather?.length < query?.total : true
                }
              >
                <Button
                  type="primary"
                  onClick={() => {
                    setQuery({ ...query, limit: query.limit! + 3 });
                  }}
                >
                  Xem thêm
                </Button>
              </Visibility>
            </div>
          </div>
          <CourtMapPost listLocation={listMarkers} />
        </Visibility>
      </div>
    </>
  );
}
