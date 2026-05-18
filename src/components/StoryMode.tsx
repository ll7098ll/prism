import React from 'react';
import { useParams } from 'react-router-dom';
import StoryModeContainer from './StoryMode/StoryModeContainer';

export default function StoryMode() {
  const { moduleId } = useParams<{ moduleId: string }>();

  if (!moduleId) {
    return <div>Invalid module ID</div>;
  }

  return <StoryModeContainer moduleId={moduleId} />;
}
