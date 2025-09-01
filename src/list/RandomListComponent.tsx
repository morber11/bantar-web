import React, { useState, useEffect } from 'react';
import { fetchQuestionsByRange } from '../api/apiService';

type ListItem = {
    id: number;
    text: string;
};

const RandomListComponent: React.FC = () => {
    const [list, setList] = useState<ListItem[]>([]);
    const [usedList, setUsedList] = useState<ListItem[]>([]);
    const [randomItem, setRandomItem] = useState<ListItem | null>(null);

    const fetchList = async () => {
        try {
            const data = await fetchQuestionsByRange(0, 10);
            setList(data);
        } catch (error) {
            console.error('Error fetching the list:', error);
        }
    };

    const pickRandomItem = () => {
        if (list.length > 0) {
            const randomIndex = Math.floor(Math.random() * list.length);
            const selectedItem = list[randomIndex];

            setRandomItem(selectedItem);
            updateLists(selectedItem);
        }
    };

    const updateLists = (selectedItem: ListItem) => {
        setList((prevList) => prevList.filter((item) => item.id !== selectedItem.id));
        setUsedList((prevUsedList) => [...prevUsedList, selectedItem]);
    };

    const swapLists = () => {
        if (list.length === 0 && usedList.length > 0) {
            setList(usedList);
            setUsedList([]);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    useEffect(() => {
        swapLists();
    }, [list]);

    return (
        <div>
            <h1>Bantar 2 Cool Version</h1>
            <div>
                {randomItem ? (
                    <h2>{randomItem.text}</h2>
                ) : (
                    <p>No item selected yet.</p>
                )}
            </div>
            <button onClick={pickRandomItem}>New</button>
            {list.length === 0 && usedList.length === 0 && (
                <p>All items have been used!</p>
            )}
        </div>
    );
};

export default RandomListComponent;
