import React, { useState } from 'react';
import Icon from './Icon';
import { useFavourites } from '../../features/favourites/hooks/useFavourites';
import { normalizeText } from '../utils/normalizeText';
import { normalizeCategories } from '../utils/normalizeCategory';
import type { HistoryType } from '../types/history';

interface FavouritesButtonProps {
    text: string;
    type?: HistoryType;
    categories?: string[] | undefined;
    className?: string;
    ariaLabelRemove?: string;
    ariaLabelAdd?: string;
    onToggle?: (isFavourited: boolean) => void;
}

const FavouritesButton: React.FC<FavouritesButtonProps> = ({
    text,
    type = 'icebreaker',
    categories,
    className,
    ariaLabelRemove = 'Remove favourite',
    ariaLabelAdd = 'Add to favourites',
    onToggle,
}) => {
    const { toggleFavourite, isFavourited } = useFavourites();
    const [isAnimating, setIsAnimating] = useState(false);

    const normalized = normalizeText(text);
    const favState = isFavourited(normalized, type);

    const handleToggle = () => {
        toggleFavourite({ text: normalized, type, categories: normalizeCategories(categories) });
        setIsAnimating(true);
        onToggle?.(!favState);
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            aria-label={favState ? ariaLabelRemove : ariaLabelAdd}
            aria-pressed={favState}
            className={`z-10 ${className ?? 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300'}`}
        >
            <Icon
                name={favState ? 'star-filled' : 'star-outline'}
                className={`${favState ? 'text-yellow-400' : 'text-slate-400'} ${isAnimating ? 'transform scale-150 -rotate-6' : ''} transition-transform duration-300 ease-out origin-center w-6 h-6 pointer-events-none`}
                onTransitionEnd={() => setIsAnimating(false)}
                aria-hidden
            />
        </button>
    );
};

export default FavouritesButton;
