import React, { useState } from 'react';
import type { DebateItem } from '../types';
import StyledButton from '../../../shared/ui/StyledButton';
import Spinner from '../../../shared/ui/Spinner';
import { useHistory } from '../../history/hooks/useHistory';
import { normalizeText } from '../../../shared/utils/normalizeText';

interface RandomListProps {
  list: DebateItem[];
}

const RandomList: React.FC<RandomListProps> = ({ list }) => {
  const [currentItem, setCurrentItem] = useState<DebateItem | null>(() => {
    if (list.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  });

  const { addToHistory } = useHistory();

  const pickRandomItem = () => {
    if (list.length === 0) return;

    if (list.length === 1) {
      setCurrentItem(list[0]);
      addToHistory({
        text: list[0].text,
        type: 'debate',
      });
      return;
    }

    let randomIndex: number;
    let selectedItem: DebateItem;

    do {
      randomIndex = Math.floor(Math.random() * list.length);
      selectedItem = list[randomIndex];
    } while (currentItem && selectedItem.text === currentItem.text);

    const normalized = normalizeText(selectedItem.text);
    setCurrentItem(selectedItem);
    addToHistory({
      text: normalized,
      type: 'debate',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      pickRandomItem();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="w-full md:w-4/5 flex items-center justify-center min-h-[200px]">
          {list.length === 0 ? (
            <p className="text-center text-lg">No items available</p>
          ) : currentItem ? (
            <h2 className="text-center text-xl font-semibold">{normalizeText(currentItem.text)}</h2>
          ) : (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>

        <StyledButton onClick={pickRandomItem} disabled={list.length === 0} aria-label="Pick random debate topic">
          New Debate
        </StyledButton>
      </div>
    </div>
  );
};

export default RandomList;
