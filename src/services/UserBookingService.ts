import axiosRequest from '../plugins/request';
import { IBaseQuery } from '../types/query.types';
import { IBaseResponse, IBaseResponseList } from '../types/response.types';
import { IUserBooking } from '../types/userBooking.types';
import onRemoveParams from '../utils/functions/on-remove-params';

class UserBookingService {
  private _prefixURL = '/v1/user-booking';

  public async createUserBooking(
    data: Record<string, any>,
  ): Promise<IBaseResponse<IUserBooking>> {
    console.log('🚀 ~ UserBookingService ~ data:', data);
    try {
      const rs = await axiosRequest.post(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getListUserBookingByUser(
    id: string,
    query: IBaseQuery,
  ): Promise<IBaseResponse<IBaseResponseList<any>>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/by-user/${id}`, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default UserBookingService;
