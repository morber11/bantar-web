import React, { useState } from 'react';
import { debounce } from 'lodash';
import type { ListItem } from '../../types';

interface RandomListComponentProps {
    list: ListItem[];
}

const RandomListComponent: React.FC<RandomListComponentProps> = ({ list }) => {
    const [currentItem, setCurrentItem] = useState<ListItem | null>(null);

    const pickRandomItem = debounce(() => {
        if (list.length === 0) return;
        const randomIndex = Math.floor(Math.random() * list.length);
        const selectedItem = list[randomIndex];

        setCurrentItem(selectedItem);
    }, 50);

    if (!currentItem && list.length > 0) {
        pickRandomItem();
    }

    return (
        <div className="flex flex-col items-center text-center h-screen">
            <div style={{ paddingTop: '10vh' }}>
                <h1 className="text-xl font-semibold mb-8">Icebreakers</h1>
                <div className="w-full max-w-md mx-auto px-4 mb-16">
                    {currentItem ? (
                        <h2 className="text-2xl font-medium break-words">
                            {currentItem.text}
                        </h2>
                    ) : (
                        <p className="text-lg text-gray-500">Ready to pick an item</p>
                    )}
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: '10vh', left: '50%', transform: 'translateX(-50%)' }}>
                <button
                    onClick={pickRandomItem}
                    disabled={list.length === 0}
                    aria-label="Pick random item"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                              focus:ring-2 focus:ring-blue-300 focus:outline-none"
                >New</button>
            </div>
        </div>
    );
};

export default RandomListComponent;
