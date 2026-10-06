import { DebateCategory, debateCategoryKeys } from '../types';
import CategorySidebarContent from '../../../shared/ui/CategorySidebarContent';

const categories = debateCategoryKeys.map(key => ({ id: key, label: DebateCategory[key], enabled: true }));

interface DebateSidebarContentProps {
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
}

const DebateSidebarContent = ({ selectedCategories, onCategoriesChange }: DebateSidebarContentProps) => (
    <CategorySidebarContent
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoriesChange={onCategoriesChange}
    />
);

export default DebateSidebarContent;
