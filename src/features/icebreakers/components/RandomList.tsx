import React from 'react';
import SharedRandomList, { type SharedListItem } from '../../../shared/ui/RandomList';
import { useAppSettings } from '../../../shared/context/appSettingsContextImpl';

interface RandomListProps {
  list: SharedListItem[];
}

const RandomList: React.FC<RandomListProps> = ({ list }) => {
  const { showCategoryDetails } = useAppSettings();
  return (
    <SharedRandomList
      list={list}
      itemType="icebreaker"
      buttonLabel="New Icebreaker"
      showCategoryDetails={showCategoryDetails}
    />
  );
};

export default RandomList;
