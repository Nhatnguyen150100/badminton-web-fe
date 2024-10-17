import * as React from 'react';
import { IBadmintonCourt } from '../../../types/badmintonCourt.types';
import { IBaseQuery } from '../../../types/query.types';
import Visibility from '../../../components/base/visibility';
import { Button, Empty, message, Spin } from 'antd';
import { badmintonCourtService } from '../../../services';
import { CompassOutlined, InfoOutlined } from '@ant-design/icons';
import {
  onGetDistrictName,
  onGetWardName,
} from '../../../utils/functions/on-location-name';
import CourtMapPost from '../../../components/base/CourtMapPost';

export default function ListBadmintonCourtPost() {
  const [listCourt, setListCourt] = React.useState<IBadmintonCourt[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<IBaseQuery>({
    limit: 5,
    page: 1,
  });

  const handleGetList = async () => {
    try {
      setLoading(true);
      const rs = await badmintonCourtService.getBadmintonCourtPost(query);
      setListCourt(rs.data.content);
      setQuery({ ...query, total: rs.data.totalCount });
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const listMarkers = React.useMemo(() => {
    return listCourt.map((court) => ({
      id: court.id,
      position: [court.lat, court.lang],
      address: court.address,
    }));
  }, [listCourt]);

  React.useEffect(() => {
    handleGetList();
  }, [query.limit]);

  // const districtData = DATA.level2s.map((district): ISelectType => {
  //   return {
  //     label: district.name,
  //     value: district.level2_id,
  //   };
  // });

  // const wardData = useMemo(() => {
  //   if (!district) return [];
  //   const currentDistrict = DATA.level2s.find(
  //     (districtData) => districtData.level2_id === district,
  //   );
  //   return currentDistrict?.level3s.map(
  //     (wardData): ISelectType => ({
  //       label: wardData.name,
  //       value: wardData.level3_id,
  //     }),
  //   );
  // }, [district]);

  return (
    <>
      <div className="h-[calc(100vh-170px)] grid grid-cols-2 gap-x-3">
        <div className="h-full overflow-y-auto overflow-x-hidden flex-col justify-center items-start space-y-3">
          <Visibility
            visibility={Boolean(listCourt.length)}
            suspenseComponent={loading ? <Spin /> : <Empty />}
          >
            {listCourt.map((court) => (
              <div
                key={court.id}
                className="flex flex-row justify-start items-start rounded-2xl shadow-xl p-5 space-x-5 cursor-pointer hover:border-dashed hover:border hover:border-blue-500"
              >
                <img
                  className="h-full max-w-[260px] rounded-xl object-contain"
                  src={court.imageCourt}
                  alt="Ảnh sân"
                />
                <div className="flex flex-col justify-start items-start space-y-3">
                  <h1 className="capitalize text-2xl font-bold">
                    {court.name}
                  </h1>
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <CompassOutlined style={{ color: 'red' }} />
                    <span>{`${onGetDistrictName(
                      court.district,
                    )} - ${onGetWardName(court.district, court.ward)} - ${
                      court.address
                    }`}</span>
                  </div>
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <InfoOutlined style={{ color: 'red' }} />
                    <span className="whitespace-pre-wrap capitalize">
                      {court.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center">
              <Visibility
                visibility={
                  query?.total ? listCourt?.length < query?.total : true
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
          </Visibility>
        </div>
        <CourtMapPost listLocation={listMarkers} />
      </div>
    </>
  );
}
