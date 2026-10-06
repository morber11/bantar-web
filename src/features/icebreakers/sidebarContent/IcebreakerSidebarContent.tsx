import { IcebreakerCategory, icebreakerCategoryKeys } from '../types';
import CategorySidebarContent from '../../../shared/ui/CategorySidebarContent';

const categories = icebreakerCategoryKeys.map(key => ({ id: key, label: IcebreakerCategory[key], enabled: true }));

interface IcebreakersSidebarContentProps {
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
}

const IcebreakersSidebarContent = ({ selectedCategories, onCategoriesChange }: IcebreakersSidebarContentProps) => (
    <CategorySidebarContent
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoriesChange={onCategoriesChange}
    />
);

export default IcebreakersSidebarContent;
