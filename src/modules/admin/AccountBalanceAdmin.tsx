import * as React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../lib/store';
import { formatCurrencyVND } from '../../utils/functions/format-money';

export default function AccountBalanceAdmin() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <div className="flex flex-col justify-start items-start space-y-3">
      <label className='text-xl'>
        Tổng số tiền đã nhận chiết khấu:{' '}
        <span className='text-green-800 font-semibold'>{formatCurrencyVND(user.accountBalance ?? 0)}</span>
      </label>
    </div>
  );
}
