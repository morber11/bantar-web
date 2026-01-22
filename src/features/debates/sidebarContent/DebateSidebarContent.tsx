import { DebateCategory, debateCategoryKeys } from '../types';
import Icon from '../../../shared/ui/Icon';

const categories = debateCategoryKeys.map(key => ({ id: key, label: DebateCategory[key], enabled: true }));

interface DebateSidebarContentProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const DebateSidebarContent = ({ selectedCategories, onCategoriesChange }: DebateSidebarContentProps) => {
  const allCategoryIds = categories.map(c => c.id);

  const selectAll = () => {
    onCategoriesChange([...allCategoryIds]);
  };

  const clearAll = () => {
    onCategoriesChange([]);
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  };

  const isAllSelected = allCategoryIds.length > 0 && allCategoryIds.every(id => selectedCategories.includes(id));

  return (
    <div className="mt-8">
      <h3 className="px-4 text-base font-semibold text-slate-400 uppercase tracking-wider mb-3">Categories</h3>
      <ul className="space-y-1">
        <li>
          <div className="w-full flex items-center justify-between px-4 py-2 text-slate-700 dark:text-slate-200 rounded-lg">
            <label className="flex items-center space-x-3 cursor-pointer" htmlFor="select-all">
              <input
                id="select-all"
                type="checkbox"
                className="w-4 h-4"
                checked={isAllSelected}
                onChange={(e) => {
                  if (e.target.checked) selectAll(); else clearAll();
                }}
              />
              <span className="select-none text-lg">Select All</span>
            </label>
          </div>
        </li>

        {categories.map(({ id, label, enabled }) => (
          <li key={id}>
            <button
              onClick={() => toggleCategory(id)}
              className="w-full flex items-center justify-between px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              disabled={!enabled}
            >
              <span className="text-lg">{label}</span>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedCategories.includes(id) ? 'bg-blue-500 border-blue-500' : 'border-slate-500'
                }`}
              >
                {selectedCategories.includes(id) && (
                  <Icon name="check" className="w-3 h-3 text-slate-900 dark:text-white" aria-hidden />
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebateSidebarContent;
