import * as React from 'react'
import { useParams } from 'react-router-dom';

export default function GatherPostDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>GatherPostDetail</div>
  )
}