import React, { useState, useEffect } from 'react';
import StyledButton from './StyledButton';
import Spinner from './Spinner';
import { useHistory } from '../../features/history/hooks/useHistory';
import { normalizeText } from '../utils/normalizeText';
import { normalizeCategories } from '../utils/normalizeCategory';
import { useAppSettings } from '../context/appSettingsContextImpl';

export type SharedListItem = {
    id?: number | string;
    text: string;
    categories?: string[];
};

type HistoryType = 'icebreaker' | 'debate' | 'ai' | 'mindreader';

interface RandomListProps {
    list: SharedListItem[];
    itemType?: HistoryType;
    buttonLabel?: string;
    showCategoryDetails?: boolean;
}

const RandomList: React.FC<RandomListProps> = ({ list, itemType, buttonLabel = 'New', showCategoryDetails }) => {
    const [currentItem, setCurrentItem] = useState<SharedListItem | null>(null);

    const { addToHistory } = useHistory();
    const appSettings = useAppSettings();
    const [isPicking, setIsPicking] = useState(false);

    const showDetails = showCategoryDetails ?? appSettings.showCategoryDetails;

    useEffect(() => {
        if (list.length === 0) {
            if (currentItem !== null) {
                setCurrentItem(null);
            }
            return;
        }

        if (currentItem && list.some(item => item.text === currentItem.text)) {
            return;
        }

        const item = list[Math.floor(Math.random() * list.length)];
        setCurrentItem(item);
        if (itemType) {
            addToHistory({
                text: normalizeText(item.text),
                type: itemType,
                categories: normalizeCategories(item.categories),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, itemType, addToHistory]);

    const pickRandomItem = () => {
        if (list.length === 0) {
            return;
        }

        if (isPicking) {
            return;
        }

        setIsPicking(true);

        let nextItem: SharedListItem;

        if (list.length === 1) {
            nextItem = list[0];
        } else {
            let randomIndex: number;
            do {
                randomIndex = Math.floor(Math.random() * list.length);
                nextItem = list[randomIndex];
            } while (currentItem && nextItem.text === currentItem.text);
        }

        setCurrentItem(nextItem);
        if (itemType) {
            addToHistory({
                text: normalizeText(nextItem.text),
                type: itemType,
                categories: normalizeCategories(nextItem.categories),
            });
        }
        setIsPicking(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (
            (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') &&
            list.length > 0 &&
            !isPicking &&
            currentItem
        ) {
            event.preventDefault();
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
                        <div className="flex flex-col items-center w-full">
                            <h2 className="text-center text-xl font-semibold max-w-3xl">{normalizeText(currentItem.text)}</h2>
                            {showDetails && (
                                <p className="text-center text-sm text-gray-400 mt-2 max-w-3xl break-words">
                                    <span className="font-medium">Categories:</span>{' '}
                                    <span className="text-gray-400">{normalizeCategories(currentItem.categories).join(', ')}</span>
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                </div>

                <StyledButton onClick={pickRandomItem} disabled={list.length === 0 || isPicking || !currentItem} aria-label="Pick random item">
                    {buttonLabel}
                </StyledButton>
            </div>
        </div>
    );
};

export default RandomList;