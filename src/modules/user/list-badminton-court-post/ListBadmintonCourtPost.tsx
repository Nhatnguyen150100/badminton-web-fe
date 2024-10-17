import * as React from 'react';
import { IBadmintonCourt } from '../../../types/badmintonCourt.types';
import { IBaseQuery } from '../../../types/query.types';
import Visibility from '../../../components/base/visibility';
import { Empty, message } from 'antd';
import { badmintonCourtService } from '../../../services';
import { CompassOutlined, InfoOutlined } from '@ant-design/icons';
import {
  onGetDistrictName,
  onGetWardName,
} from '../../../utils/functions/on-location-name';

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

  React.useEffect(() => {
    if (!query.nameLike) handleGetList();
  }, [query.nameLike]);

  return (
    <div className="h-[calc(100vh-170px)] flex flex-row justify-between items-center">
      <div className="h-full overflow-y-auto overflow-x-hidden flex-col justify-center items-start space-y-3">
        <Visibility
          visibility={Boolean(listCourt.length)}
          suspenseComponent={<Empty />}
        >
          {listCourt.map((court) => (
            <div
              key={court.id}
              className="flex flex-row justify-start items-start rounded-2xl shadow-xl p-5 space-x-5 cursor-pointer hover:border-dashed hover:border hover:border-blue-500"
            >
              <img className="h-[160px] rounded-lg" src={court.imageCourt} alt="Ảnh sân" />
              <div className="flex flex-col justify-start items-start space-y-3">
                <h1 className="capitalize text-xl font-bold">{court.name}</h1>
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
                  <span className='whitespace-pre-wrap capitalize'>{court.description}</span>
                </div>
              </div>
            </div>
          ))}
        </Visibility>
      </div>
    </div>
  );
}
