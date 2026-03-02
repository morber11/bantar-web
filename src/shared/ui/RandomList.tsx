import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import StyledButton from './StyledButton';
import Spinner from './Spinner';
import { useHistory } from '../../features/history/hooks/useHistory';
import { normalizeText } from '../utils/normalizeText';
import { normalizeCategories } from '../utils/normalizeCategory';
import { formatCategoryLabel } from '../utils/formatCategoryLabel';
import { useAppSettings } from '../context/appSettingsContextImpl';
import FavouritesButton from './FavouritesButton';
import type { HistoryType } from '../types/history';

export type SharedListItem = {
    id?: number | string;
    text: string;
    categories?: string[];
};


interface RandomListProps {
    list: SharedListItem[];
    itemType?: HistoryType;
    buttonLabel?: string;
    showCategoryDetails?: boolean;
}

const RandomList = ({ list, itemType, buttonLabel = 'New', showCategoryDetails }: RandomListProps) => {
    const [currentItem, setCurrentItem] = useState<SharedListItem | null>(null);
    const currentItemRef = useRef<SharedListItem | null>(null);
    currentItemRef.current = currentItem;

    const { addToHistory } = useHistory();
    const appSettings = useAppSettings();
    const [isPicking, setIsPicking] = useState(false);

    const showDetails = showCategoryDetails ?? appSettings.showCategoryDetails;

    useEffect(() => {
        if (list.length === 0) {
            if (currentItemRef.current !== null) {
                setCurrentItem(null);
            }
            return;
        }

        if (currentItemRef.current && list.some(item => item.text === currentItemRef.current!.text)) {
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

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
                <div className="w-full md:w-4/5 relative flex items-center justify-center min-h-[200px]">
                    {list.length === 0 ? (
                        <p className="text-center text-lg">No items available</p>
                    ) : currentItem ? (
                        <div className="flex flex-col items-center w-full relative">
                            <h2 className="text-center text-xl font-semibold max-w-3xl mx-auto">
                                {normalizeText(currentItem.text)}
                            </h2>
                            {showDetails && (
                                <p className="text-center text-sm text-gray-400 mt-2 max-w-3xl break-words">
                                    <span className="font-medium">Categories:</span>{' '}
                                    <span className="text-gray-400">{normalizeCategories(currentItem.categories).map(formatCategoryLabel).join(', ')}</span>
                                </p>
                            )}
                            <div className="flex justify-center items-center mt-4">
                                {itemType && (
                                    <FavouritesButton
                                        text={currentItem.text}
                                        type={itemType}
                                        categories={currentItem.categories}
                                        className="z-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
                                    />
                                )}
                            </div>
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