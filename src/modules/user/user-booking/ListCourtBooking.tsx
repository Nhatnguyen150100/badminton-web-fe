import * as React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../lib/store';

export default function ListCourtBooking() {
  const user = useSelector((state: IRootState) => state.user);

  return <div>ListCourtBooking</div>;
}
