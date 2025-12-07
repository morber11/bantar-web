import React, { useState } from 'react';
import { useHistory } from '../hooks/useHistory';
import type { HistoryItem } from '../hooks/useHistory';
import Sidebar from '../../navigation/components/Sidebar';
import StyledButton from '../../../shared/ui/StyledButton';
import Toast from '../../../shared/ui/Toast';
import { normalizeText } from '../../../shared/utils/normalizeText';
import FavouritesButton from '../../../shared/ui/FavouritesButton';
import { useAppSettings } from '../../../shared/context/appSettingsContextImpl';
import { formatCategoryLabel } from '../../../shared/utils/formatCategoryLabel';
import formatItemType from '../../../shared/utils/formatItemType';

const HistoryItemComponent: React.FC<{ item: HistoryItem; onRemove: (id: string) => void; onShowToast: (message: string) => void }> = ({ item, onRemove, onShowToast }) => {
  const { showCategoryDetails } = useAppSettings();
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(item.text);
      onShowToast('Copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      onShowToast('Failed to copy to clipboard');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium mb-2 break-words">{normalizeText(item.text)}</p>
          {/*
            hide categories for AI and Mind Reader items until categories are available
            TODO: re-enable category display for 'ai' and 'mindreader' items when available
          */}
          {showCategoryDetails && item.type !== 'ai' && item.type !== 'mindreader' && item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {item.categories.map((c) => (
                <span key={c} className="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded-full border border-slate-200">
                  {formatCategoryLabel(c)}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
            <span>{formatItemType(item.type)}</span>
            <span>{formatDate(item.timestamp)}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0 items-center">
          <FavouritesButton
            text={item.text}
            type={item.type}
            categories={item.categories}
            className="text-slate-400 hover:text-yellow-400"
          />
          <StyledButton
            onClick={handleShare}
            className="px-3 py-1 text-sm"
            aria-label={`Share ${item.type}`}
          >
            Share
          </StyledButton>
          <StyledButton
            onClick={() => onRemove(item.id)}
            classOverride="px-3 py-1 text-sm bg-red-800 hover:bg-red-700 text-white font-bold rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
            aria-label={`Remove ${item.type} from history`}
          >
            Remove
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default function HistoryPage() {
  const { history, clearHistory, removeFromHistory } = useHistory();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Recently Viewed</h1>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No recently viewed items yet.</p>
              <p className="text-sm text-gray-500 mt-2">
                Start exploring Bantar and any history items will appear here!
              </p>
            </div>
          ) : (
            <div>
              {history.map((item) => (
                <HistoryItemComponent
                  key={item.id}
                  item={item}
                  onRemove={removeFromHistory}
                  onShowToast={showToast}
                />
              ))}
              <div className="mt-8 text-center">
                <StyledButton onClick={clearHistory} classOverride="px-3 py-1 text-sm bg-red-800 hover:bg-red-700 text-white font-bold rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300">
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