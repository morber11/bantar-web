import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import type { ListItem } from '../../types';

interface RandomListComponentProps {
    list: ListItem[];
    setList: (updatedList: ListItem[]) => void;
}

const RandomListComponent: React.FC<RandomListComponentProps> = ({ list, setList }) => {
    const [usedList, setUsedList] = useState<ListItem[]>([]);
    const [randomItem, setRandomItem] = useState<ListItem | null>(null);

    const pickRandomItem = () => {
        if (list.length > 0) {
            const randomIndex = Math.floor(Math.random() * list.length);
            const selectedItem = list[randomIndex];

            setRandomItem(selectedItem);
            updateLists(selectedItem);
        }
    };

    const debouncePickRandomItem = debounce(pickRandomItem, 500, { leading: true, trailing: false });

    const updateLists = (selectedItem: ListItem) => {
        const updatedList = list.filter((item) => item.id !== selectedItem.id);
        setList(updatedList);

        setUsedList((prevUsedList) => [...prevUsedList, selectedItem]);
    };

    const swapLists = () => {
        if (list.length === 0 && usedList.length > 0) {
            setList(usedList);
            setUsedList([]);
        }
    };

    useEffect(() => {
        if (list.length > 0 && randomItem === null) {
            pickRandomItem();
        }
        swapLists();
    }, [list, randomItem]);

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-xl font-semibold mb-4">Bantar 2 Cool Version</h1>
            <div className="mb-4">
                {randomItem ? (
                    <h2 className="text-2xl font-medium">{randomItem.text}</h2>
                ) : (
                    <p className="text-lg text-gray-500">No item selected yet.</p>
                )}
            </div>
            <button
                onClick={debouncePickRandomItem}
                disabled={list.length === 0}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 mb-4">
                New
            </button>
        </div>
    );
};

export default RandomListComponent;
