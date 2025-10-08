import React, { useState } from 'react';
import type { ListItem } from '../../types';
import StyledButton from '../ui/StyledButton';

interface RandomListComponentProps {
    list: ListItem[];
}

const RandomListComponent: React.FC<RandomListComponentProps> = ({ list }) => {
    const [currentItem, setCurrentItem] = useState<ListItem | null>(() => {
        if (list.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    });

    const pickRandomItem = () => {
        if (list.length === 0) return;

        if (list.length === 1) {
            setCurrentItem(list[0]);
            return;
        }

        let randomIndex: number;
        let selectedItem: ListItem;

        do {
            randomIndex = Math.floor(Math.random() * list.length);
            selectedItem = list[randomIndex];
        } while (currentItem && selectedItem.text === currentItem.text);

        setCurrentItem(selectedItem);
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
                        <p className="text-center text-lg">
                            No items available
                        </p>
                    ) : currentItem ? (
                        <h2 className="text-center text-xl font-semibold">
                            {currentItem.text}
                        </h2>
                    ) : (
                        <p className="text-center text-lg">
                            Loading...
                        </p>
                    )}
                </div>

                <StyledButton onClick={pickRandomItem} disabled={list.length === 0} aria-label="Pick random question">
                    New Icebreaker
                </StyledButton>
            </div>
        </div>
    );
};

export default RandomListComponent;