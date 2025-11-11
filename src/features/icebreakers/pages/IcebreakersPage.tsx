import { useState } from 'react';
import RandomList from '../../../shared/ui/RandomList';
import Sidebar from '../../navigation/components/Sidebar';
import IcebreakersSidebarContent from '../sidebarContent/IcebreakerSidebarContent';
import useFetchByCategories from '../hooks/useFetchByCategories';
import { icebreakerCategoryKeys } from '../types';
import Spinner from '../../../shared/ui/Spinner';

export default function IcebreakersPage() {
  const defaultCategories = icebreakerCategoryKeys.filter((key) => key !== 'NSFW');
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
                <Spinner />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div>
                  <p className="text-center">Error loading icebreakers</p>
                  <p className="text-center">{error}</p>
                </div>
              </div>
            ) : (
              <RandomList list={list} itemType="icebreaker" buttonLabel="New Icebreaker" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}