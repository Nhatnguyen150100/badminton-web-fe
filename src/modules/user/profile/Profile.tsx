import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { Button, DatePicker, Form, FormProps, Input, Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import GeneralLoading from '../../../components/base/GeneralLoading';
import { profileService } from '../../../services';
import { toast } from 'react-toastify';
import { setUser } from '../../../lib/reducer/userSlice';
import AvatarUpload from '../../../components/common/AvatarUpload';
import axiosRequest from '../../../plugins/request';

type FieldType = {
  email: string;
  fullName?: string;
  gender?: string;
  phoneNumber?: number;
};

export default function Profile() {
  const [file, setFile] = React.useState<File>();
  const [form] = Form.useForm();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [currentAvatar, setCurrentAvatar] = React.useState<string | null>(user?.avatar);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const data = { ...values };
    try {
      setLoading(true);
      const formData = new FormData();
      if (file) formData.append('avatar', file);
      formData.append('fullName', data.fullName!);
      formData.append('gender', data.gender!);
      formData.append('phoneNumber', data.phoneNumber!.toString());
      const rs = await profileService.updateKanji(user.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(setUser({ ...user, ...rs.data }));
      toast.success(rs.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFile = async (file: File | undefined) => {
    setFile(file);
    setCurrentAvatar(null);
  };

  return (
    <div className="p-10 rounded-2xl border-[2px] border-blue-500 border-dotted flex flex-col justify-center items-start w-full">
      <Form
        className="w-full mt-5"
        form={form}
        labelCol={{ span: 6 }}
        labelAlign="left"
        name="form"
        onFinish={onFinish}
        initialValues={{
          email: user.email,
          fullName: user.fullName,
          gender: user.gender ?? 'Male',
          phoneNumber: user.phoneNumber,
        }}
        autoComplete="off"
      >
        <Form.Item<any> label="Ảnh đại diện">
          <AvatarUpload
            avatar={currentAvatar}
            file={file}
            handleUploadFile={handleUploadFile}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input character' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label="Tên đầy đủ"
          name="fullName"
          rules={[{ required: true, message: 'Please input full name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: 'Please input gender' }]}
        >
          <Radio.Group>
            <Radio value={'Male'}>Nam</Radio>
            <Radio value={'Female'}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input phone number' }]}
        >
          <Input type="number" />
        </Form.Item>

        <div className="w-full flex justify-end items-end">
          <Button type="primary" htmlType="submit">
            Cập nhật thông tin người dùng
          </Button>
        </div>
      </Form>
      <GeneralLoading isLoading={loading} />
    </div>
  );
}
