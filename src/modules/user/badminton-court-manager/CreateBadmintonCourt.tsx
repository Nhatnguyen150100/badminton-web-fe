import * as React from 'react';
import GeneralLoading from '../../../components/base/GeneralLoading';
import CreateOrEditCourtInfo from './common/CreateOrEditCourtInfo';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { badmintonCourtService } from '../../../services';

export default function CreateBadmintonCourt() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const rs = await badmintonCourtService.createBadmintonCourt(data);
      toast.success(rs.message);
      navigate(-1);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <CreateOrEditCourtInfo handleSubmit={handleSubmit}/>;
      <GeneralLoading isLoading={loading} />
    </>
  );
}
