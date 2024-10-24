import * as React from 'react';
import { IBadmintonGather } from '../../../../types/badmintonGather.types';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../lib/store';
import { Button, DatePicker, Form, FormProps, Input, Select, TimePicker } from 'antd';
import DATA from '../../../../mock/dvhc.json';
import { ISelectType } from '../../../../types/select.types';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { FORMAT_TIME } from '../../../../constants/time';
import TextArea from 'antd/es/input/TextArea';
import ImgUpload from '../../../../components/base/ImgUpload';
import HanoiMap from '../../../../components/base/HanoiMap';
import { ILatLng } from '../../../../types/badmintonCourt.types';
import { DEFINE_GATHER_LEVEL_ARRAY } from '../../../../constants/level-gather';

interface IProps {
  badmintonGather?: IBadmintonGather;
  handleSubmit: (data: FormData) => void;
}

type FieldType = {
  nameClub: string;
  description?: string;
  badmintonCourtName: string;
  district: string;
  ward: string;
  address: string;
  courtNumber: string;
  startTime: string;
  endTime: string;
  appointmentDate: string;
  totalMale: number;
  totalFemale: number;
  constPerMale: number;
  constPerFemale: number;
  imgCourt: string;
  level: string;
};

export default function CreateOrEditBadmintonGather({
  badmintonGather,
  handleSubmit,
}: IProps) {
  const user = useSelector((state: IRootState) => state.user);
  const [file, setFile] = React.useState<File>();
  const [currentImg, setCurrentImg] = React.useState<string | null>(
    badmintonGather?.imgCourt ?? null,
  );

  const [location, setLocation] = React.useState<ILatLng>({
    lat: Number(badmintonGather?.lat),
    lng: Number(badmintonGather?.lang),
  });
  const [form] = Form.useForm();
  const district = Form.useWatch('district', form);

  const districtData = DATA.level2s.map((district): ISelectType => {
    return {
      label: district.name,
      value: district.level2_id,
    };
  });

  const wardData = React.useMemo(() => {
    if (!district) return [];
    const currentDistrict = DATA.level2s.find(
      (districtData) => districtData.level2_id === district,
    );
    return currentDistrict?.level3s.map(
      (wardData): ISelectType => ({
        label: wardData.name,
        value: wardData.level3_id,
      }),
    );
  }, [district]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const data = { ...values };
    if (!user.id) {
      toast.error('User id không tìm thấy');
      return;
    }
    const formData = new FormData();
    formData.append('userId', user.id.toString());
    formData.append('nameClub', data.nameClub);
    formData.append('description', data.description ?? '');
    formData.append('badmintonCourtName', data.badmintonCourtName ?? '');
    formData.append('district', data.district);
    formData.append('ward', data.ward);
    formData.append('address', data.address);
    formData.append('lang', location.lng.toString());
    formData.append('lat', location.lat.toString());
    formData.append('courtNumber', data.courtNumber);
    formData.append('startTime', dayjs(data.startTime).format(FORMAT_TIME));
    formData.append('endTime', dayjs(data.endTime).format(FORMAT_TIME));
    formData.append('appointmentDate', data.appointmentDate.toString());
    formData.append('totalMale', data.totalMale.toString());
    formData.append('totalFemale', data.totalFemale.toString());
    formData.append('constPerMale', data.constPerMale.toString());
    formData.append('constPerFemale', data.constPerFemale.toString());
    formData.append('level', data.level);

    if (file) formData.append('imgCourt', file);
    handleSubmit(formData);
  };

  const handleUploadFile = (file: File | undefined) => {
    setFile(file);
    setCurrentImg(null);
  };

  const handleClickMap = (latLng: ILatLng | null) => {
    setLocation({
      lat: latLng?.lat ?? location.lat,
      lng: latLng?.lng ?? location.lng,
    });
  };

  return (
    <div className="w-full pe-10">
      <Form
        className="w-full mt-5"
        form={form}
        labelCol={{ span: 6 }}
        labelAlign="left"
        name="form"
        onFinish={onFinish}
        initialValues={{
          nameClub: badmintonGather?.nameClub,
          description: badmintonGather?.description,
          badmintonCourtName: badmintonGather?.badmintonCourtName,
          district: badmintonGather?.district,
          ward: badmintonGather?.ward,
          address: badmintonGather?.address,
          courtNumber: badmintonGather?.courtNumber,
          startTime: badmintonGather?.startTime
            ? dayjs(badmintonGather?.startTime, FORMAT_TIME)
            : null,
          endTime: badmintonGather?.endTime
            ? dayjs(badmintonGather?.endTime, FORMAT_TIME)
            : null,
          appointmentDate: badmintonGather?.appointmentDate
            ? dayjs(badmintonGather?.appointmentDate)
            : null,
          totalMale: badmintonGather?.totalMale,
          totalFemale: badmintonGather?.totalFemale,
          constPerMale: badmintonGather?.constPerMale,
          constPerFemale: badmintonGather?.constPerFemale,
          level: badmintonGather?.level,
        }}
        autoComplete="off"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <Form.Item<FieldType>
              label="Tiêu đề bài đăng"
              name="nameClub"
              rules={[{ required: true, message: 'Hãy nhập tiêu đề bài đăng' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Tên sân cầu"
              name="badmintonCourtName"
              rules={[{ required: true, message: 'Hãy nhập tên sân cầu' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Quận/huyện"
              name="district"
              rules={[{ required: true, message: 'Hãy nhập tên quận/huyện' }]}
            >
              <Select
                options={districtData}
                onChange={(_) => {
                  form.setFieldsValue({ ward: '' });
                }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Phường/xã"
              name="ward"
              rules={[{ required: true, message: 'Hãy nhập tên phường/xã' }]}
            >
              <Select disabled={!district} options={wardData} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Địa chỉ cụ thể"
              name="address"
              rules={[
                { required: true, message: 'Hãy nhập tên địa chỉ cụ thể' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Sân thi đấu"
              name="courtNumber"
              rules={[
                { required: true, message: 'Hãy nhập tên sân thi đấu cụ thể' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Ngày cho thuê"
              name="appointmentDate"
              rules={[{ required: true, message: 'Hãy nhập ngày cho thuê' }]}
            >
              <DatePicker className="w-full" format={'DD/MM/YYYY'} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Giờ bắt đầu"
              name="startTime"
              rules={[{ required: true, message: 'Hãy nhập giờ bắt đầu' }]}
            >
              <TimePicker
                className="w-full"
                format={FORMAT_TIME}
                placeholder="Chọn thời gian bắt đầu"
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Giờ kết thúc"
              name="endTime"
              rules={[{ required: true, message: 'Hãy nhập giờ kết thúc' }]}
            >
              <TimePicker
                className="w-full"
                format={FORMAT_TIME}
                placeholder="Chọn thời gian kết thúc"
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mô tả câu lạc bộ"
              name="description"
              rules={[{ required: true, message: 'Hãy nhập mô tả về sân' }]}
            >
              <TextArea />
            </Form.Item>
          </div>
          <div className='flex flex-col'>
            <Form.Item<any>
              label={
                <div className="text-sm space-x-2">
                  <span className="text-red-500">*</span>
                  <span>Ảnh của sân</span>
                </div>
              }
            >
              <ImgUpload
                imgProps={currentImg}
                file={file}
                handleUploadFile={handleUploadFile}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="Nam cần thuê"
              name="totalMale"
              rules={[
                { required: true, message: 'Hãy nhập số lượng nam cần thuê' },
              ]}
            >
              <Input type='number' />
            </Form.Item>
            <Form.Item<FieldType>
              label="Nữ cần thuê"
              name="totalFemale"
              rules={[
                { required: true, message: 'Hãy nhập số lượng nữ cần thuê' },
              ]}
            >
              <Input type='number' />
            </Form.Item>
            <Form.Item<FieldType>
              label="Giá thuê nam"
              name="constPerMale"
              rules={[
                { required: true, message: 'Hãy nhập giá thuê nam' },
              ]}
            >
              <Input type='number' />
            </Form.Item>

            <Form.Item<FieldType>
              label="Giá thuê nữ"
              name="constPerFemale"
              rules={[
                { required: true, message: 'Hãy nhập giá thuê nữ' },
              ]}
            >
              <Input type='number' />
            </Form.Item>

            <Form.Item<FieldType>
              label="Trình độ"
              name="level"
              rules={[
                { required: true, message: 'Hãy nhập trình độ cần thuê' },
              ]}
            >
              <Select options={DEFINE_GATHER_LEVEL_ARRAY} />
            </Form.Item>


          </div>
        </div>

        <div className="flex flex-col justify-start items-start space-y-5">
          <div className="text-sm space-x-2">
            <span className="text-red-500">*</span>
            <span>Địa điểm của sân trên bản đồ</span>
          </div>
          <HanoiMap location={location} handleClickMap={handleClickMap} />
        </div>

        <div className="w-full flex justify-end items-end my-5">
          <Button type="primary" htmlType="submit">
            {badmintonGather?.id
              ? 'Cập nhật thông tin giao lưu'
              : 'Thêm mới thông tin giao lưu'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
