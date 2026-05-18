import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoryMode } from '../../hooks/useStoryMode';
import StoryModeView from './StoryModeView';

interface Props {
  moduleId: string;
}

export default function StoryModeContainer({ moduleId }: Props) {
  const navigate = useNavigate();
  
  const {
    profile, loading, generating, consequence, storyText, imageUrl, choices, miniGame, history, tailoredInterest, isEnding, endingSummary,
    selectedTerm, setSelectedTerm, selectedDef, setSelectedDef, matchedPairs, gameMessage,
    handleChoice, handleMatch, moduleInfo, t, tStory, currentCountry
  } = useStoryMode(moduleId);

  return (
    <StoryModeView 
      moduleId={moduleId}
      navigate={navigate}
      profile={profile}
      loading={loading}
      generating={generating}
      consequence={consequence}
      storyText={storyText}
      imageUrl={imageUrl}
      choices={choices}
      miniGame={miniGame}
      history={history}
      tailoredInterest={tailoredInterest}
      isEnding={isEnding}
      endingSummary={endingSummary}
      selectedTerm={selectedTerm}
      setSelectedTerm={setSelectedTerm}
      selectedDef={selectedDef}
      setSelectedDef={setSelectedDef}
      matchedPairs={matchedPairs}
      gameMessage={gameMessage}
      handleChoice={handleChoice}
      handleMatch={handleMatch}
      moduleInfo={moduleInfo}
      t={t}
      tStory={tStory}
      currentCountry={currentCountry}
    />
  );
}
