import React, { useState, useRef, useEffect } from 'react';
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

type HistoryType = 'icebreaker' | 'debate' | 'ai';

interface RandomListProps {
    list: SharedListItem[];
    itemType?: HistoryType; // if provided, the component will add picks to history
    buttonLabel?: string;
    showCategoryDetails?: boolean;
}

const RandomList: React.FC<RandomListProps> = ({ list, itemType, buttonLabel = 'New', showCategoryDetails }) => {
    const [currentItem, setCurrentItem] = useState<SharedListItem | null>(() => {
        if (list.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    });

    const { addToHistory } = useHistory();
    const appSettings = useAppSettings();
    const showDetails = typeof showCategoryDetails === 'boolean' ? showCategoryDetails : appSettings.showCategoryDetails;

    // Capture and add the initial item only once.
    const initialItemRef = useRef<SharedListItem | null>(currentItem);
    useEffect(() => {
        if (initialItemRef.current && itemType) {
            addToHistory({
                text: normalizeText(initialItemRef.current.text),
                type: itemType,
                categories: normalizeCategories(initialItemRef.current.categories),
            });
            initialItemRef.current = null;
        }
    }, [addToHistory, itemType]);

    const pickRandomItem = () => {
        if (list.length === 0) return;

        if (list.length === 1) {
            const normalizedText = normalizeText(list[0].text);
            if (itemType) {
                addToHistory({ text: normalizedText, type: itemType, categories: normalizeCategories(list[0].categories) });
            }
            setCurrentItem(list[0]);
            return;
        }

        let randomIndex: number;
        let selectedItem: SharedListItem;

        do {
            randomIndex = Math.floor(Math.random() * list.length);
            selectedItem = list[randomIndex];
        } while (currentItem && selectedItem.text === currentItem.text);

        const normalized = normalizeText(selectedItem.text);
        if (itemType) {
            addToHistory({ text: normalized, type: itemType, categories: normalizeCategories(selectedItem.categories) });
        }
        setCurrentItem(selectedItem);
    };

    return (
        <div onKeyDown={() => { }} tabIndex={0}>
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

                <StyledButton onClick={pickRandomItem} disabled={list.length === 0} aria-label="Pick random item">
                    {buttonLabel}
                </StyledButton>
            </div>
        </div>
    );
};

export default RandomList;