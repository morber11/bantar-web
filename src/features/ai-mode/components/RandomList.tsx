import React, { useState } from 'react';
import type { AiItem } from '../types';
import StyledButton from '../../../shared/ui/StyledButton';
import Spinner from '../../../shared/ui/Spinner';
import { useHistory } from '../../history/hooks/useHistory';
import { normalizeText } from '../../../shared/utils/normalizeText';

interface RandomListProps {
    list: AiItem[];
}

const RandomList: React.FC<RandomListProps> = ({ list }) => {
    const [currentItem, setCurrentItem] = useState<AiItem | null>(() => {
        if (list.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    });

    const { addToHistory } = useHistory();

    const pickRandomItem = () => {
        if (list.length === 0) {
            return;
        }

        if (list.length === 1) {
            const normalizedText = normalizeText(list[0].text);
            addToHistory({ text: normalizedText, type: 'ai', categories: list[0].categories });
            setCurrentItem(list[0]);
            return;
        }

        let randomIndex: number;
        let selectedItem: AiItem;

        do {
            randomIndex = Math.floor(Math.random() * list.length);
            selectedItem = list[randomIndex];
        } while (currentItem && selectedItem.text === currentItem.text);

        const normalized = normalizeText(selectedItem.text);
        addToHistory({ text: normalized, type: 'ai', categories: selectedItem.categories });
        setCurrentItem(selectedItem);
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-8 p-8">
                <div className="w-full md:w-4/5 flex items-center justify-center min-h-[200px]">
                    {list.length === 0 ? (
                        <p className="text-center text-lg">No items available</p>
                    ) : currentItem ? (
                        <div className="flex flex-col items-center w-full">
                            <h2 className="text-center text-xl font-semibold max-w-3xl">{normalizeText(currentItem.text)}</h2>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                </div>

                <StyledButton onClick={pickRandomItem} disabled={list.length === 0} aria-label="Pick random AI item">
                    New AI Prompt
                </StyledButton>
            </div>
        </div>
    );
};

export default RandomList;
