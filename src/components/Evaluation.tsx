import React from 'react';
import { useParams } from 'react-router-dom';
import EvaluationContainer from './Evaluation/EvaluationContainer';

export default function Evaluation() {
  const { moduleId } = useParams<{ moduleId: string }>();

  if (!moduleId) {
    return <div>Invalid module ID</div>;
  }

  return <EvaluationContainer moduleId={moduleId} />;
}
