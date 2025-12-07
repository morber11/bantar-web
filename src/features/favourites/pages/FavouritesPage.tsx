import { useState } from 'react';
import Sidebar from '../../navigation/components/Sidebar';
import StyledButton from '../../../shared/ui/StyledButton';
import Toast from '../../../shared/ui/Toast';
import useFavourites from '../hooks/useFavourites';
import type { FavouriteItem } from '../hooks/useFavourites';
import { useAppSettings } from '../../../shared/context/appSettingsContextImpl';
import { formatCategoryLabel } from '../../../shared/utils/formatCategoryLabel';
import { normalizeText } from '../../../shared/utils/normalizeText';
import formatItemType from '../../../shared/utils/formatItemType';

export default function FavouritesPage() {
    const { favourites, removeFromFavourites, clearFavourites } = useFavourites();
    const appSettings = useAppSettings();
    const showDetails = appSettings.showCategoryDetails;
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => setToastMessage(message);
    const hideToast = () => setToastMessage(null);

    const handleShare = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            showToast('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy to clipboard', err);
            showToast('Failed to copy to clipboard');
        }
    };

    const renderFavouriteItem = (item: FavouriteItem) => {
        return (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium mb-2 break-words">{normalizeText(item.text)}</p>
                        {showDetails && item.type !== 'ai' && item.type !== 'mindreader' && item.categories && item.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {item.categories.map((c: string) => (
                                    <span key={c} className="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded-full border border-slate-200">
                                        {formatCategoryLabel(c)}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
                            <span>{formatItemType(item.type)}</span>
                            <span>{new Date(item.timestamp).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 items-center">
                        <StyledButton onClick={() => handleShare(item.text)} className="px-3 py-1 text-sm" aria-label={`Share ${item.type}`}>
                            Share
                        </StyledButton>
                        <StyledButton onClick={() => removeFromFavourites(item.id)} classOverride="px-3 py-1 text-sm bg-red-800 hover:bg-red-700 text-white font-bold rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300" aria-label={`Remove ${item.type} from favourites`}>
                            Remove
                        </StyledButton>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">Favourites</h1>
                    </div>

                    {favourites.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">No favourites yet.</p>
                            <p className="text-sm text-gray-500 mt-2">Add favourites to see them here.</p>
                        </div>
                    ) : (
                        <div>
                            {favourites.map((item) => renderFavouriteItem(item))}

                            <div className="mt-8 text-center">
                                <StyledButton onClick={() => clearFavourites()} classOverride="px-3 py-1 text-sm bg-red-800 hover:bg-red-700 text-white font-bold rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300">
                                    Clear All
                                </StyledButton>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {toastMessage && <Toast message={toastMessage} onClose={hideToast} />}
        </div>
    );
}