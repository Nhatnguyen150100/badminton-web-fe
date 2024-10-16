import React from 'react';
import {
  IBadmintonCourt,
  ILatLng,
} from '../../../../types/badmintonCourt.types';
import { Button, Form, FormProps, Input, Select } from 'antd';
import ImgUpload from '../../../../components/base/ImgUpload';
import TextArea from 'antd/es/input/TextArea';
import GeneralLoading from '../../../../components/base/GeneralLoading';
import HanoiMap from '../../../../components/base/HanoiMap';

interface IProps {
  badmintonCourt?: IBadmintonCourt;
}

type FieldType = {
  name: string;
  district: string;
  ward: string;
  address: string;
  description?: string;
};

export default function CreateOrEditCourtInfo({ badmintonCourt }: IProps) {
  const [file, setFile] = React.useState<File>();
  const [location, setLocation] = React.useState<ILatLng>({
    lat: Number(badmintonCourt?.lat),
    lng: Number(badmintonCourt?.lang),
  });
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const data = { ...values };
    // try {
    //   setLoading(true);
    //   const formData = new FormData();
    //   if (file) formData.append('avatar', file);
    //   formData.append('fullName', data.fullName!);
    //   formData.append('gender', data.gender!);
    //   formData.append('phoneNumber', data.phoneNumber!.toString());
    //   const rs = await profileService.updateProfile(user.id, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   dispatch(setUser({ ...user, ...rs.data }));
    //   toast.success(rs.message);
    //   navigate(-1);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleUploadFile = (file: File | undefined) => {
    setFile(file);
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
          name: badmintonCourt?.name,
          district: badmintonCourt?.district,
          ward: badmintonCourt?.ward,
          address: badmintonCourt?.address,
          description: badmintonCourt?.description,
        }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên sân"
          name="name"
          rules={[{ required: true, message: 'Hãy nhập tên sân cầu' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<any> label="Ảnh sân cầu">
          <ImgUpload
            imgProps={badmintonCourt?.imageCourt ?? null}
            file={file}
            handleUploadFile={handleUploadFile}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Quận/huyện"
          name="district"
          rules={[{ required: true, message: 'Hãy nhập tên quận/huyện' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phường/xã"
          name="ward"
          rules={[{ required: true, message: 'Hãy nhập tên phường/xã' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Địa chỉ cụ thể"
          name="ward"
          rules={[{ required: true, message: 'Hãy nhập tên địa chỉ cụ thể' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả về sân"
          name="description"
          rules={[{ required: true, message: 'Hãy nhập mô tả về sân' }]}
        >
          <TextArea />
        </Form.Item>

        <HanoiMap location={location} handleClickMap={handleClickMap} />

        <div className="w-full flex justify-end items-end my-5">
          <Button type="primary" htmlType="submit">
            {badmintonCourt?.id ? 'Cập nhật thông tin sân' : 'Thêm mới thông tin sân'}
          </Button>
        </div>
      </Form>
      <GeneralLoading isLoading={loading} />
    </div>
  );
}
