import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardContainer from './Dashboard/DashboardContainer';

export default function Dashboard() {
  const { moduleId } = useParams<{ moduleId: string }>();

  if (!moduleId) {
    return <div>Invalid module ID</div>;
  }

  return <DashboardContainer moduleId={moduleId} />;
}
