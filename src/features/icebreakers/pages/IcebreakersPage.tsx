import { useState } from 'react';
import RandomList from '../components/RandomList';
import Sidebar from '../../navigation/components/Sidebar';
import IcebreakersSidebarContent from '../sidebarContent/IcebreakerSidebarContent';
import useFetchByCategories from '../hooks/useFetchByCategories';
import { questionCategoryKeys } from '../types';

export default function IcebreakersPage() {
  const defaultCategories = questionCategoryKeys.filter((key) => key !== 'NSFW');
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
          onCategoriesChange: handleCategoriesChange,
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
            <h1 className="text-4xl font-bold mb-8 text-center">Icebreakers</h1>
          </div>

          <div>
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-center text-lg">Loading icebreakers...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div>
                  <p className="text-center">Error loading icebreakers</p>
                  <p className="text-center">{error}</p>
                </div>
              </div>
            ) : (
              <RandomList list={list} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
