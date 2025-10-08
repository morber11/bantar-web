import { useState } from 'react';
import RandomListComponent from '../components/list/RandomListComponent';
import Sidebar from '../components/sidebar/Sidebar';
import IcebreakersSidebarContent from '../components/sidebar/sidebarContent/IcebreakerSidebarContent';
import useFetchByCategories from '../hooks/useFetchByCategories';
import { questionCategoryKeys } from '../types';

export default function IcebreakersPage() {
    const defaultCategories = questionCategoryKeys.filter(key => key !== 'NSFW');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultCategories);
    
    const { list, loading, error } = useFetchByCategories(selectedCategories);

    const handleCategoriesChange = (categories: string[]) => {
        setSelectedCategories(categories);
    };

    return (
        <>
            <Sidebar 
                childProps={{
                    selectedCategories,
                    onCategoriesChange: handleCategoriesChange
                }}
            >
                <IcebreakersSidebarContent
                    selectedCategories={selectedCategories}
                    onCategoriesChange={handleCategoriesChange}
                />
            </Sidebar>
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-5xl p-4 py-20">
                    <div>
                        <h1 className="text-4xl font-bold mb-8 text-center">
                            Icebreakers
                        </h1>
                    </div>

                    <div>
                        {loading ? (
                            <div>
                                <div></div>
                                <p>Loading icebreakers...</p>
                            </div>
                        ) : error ? (
                            <div>
                                <p>Error loading icebreakers</p>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <RandomListComponent list={list} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}