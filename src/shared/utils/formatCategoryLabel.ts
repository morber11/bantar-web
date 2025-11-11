export const formatCategoryLabel = (input: string) => {
    if (!input) return input;

    if (input.includes('/') || input.includes('&') || /\d/.test(input) || input.includes('+')) {
        return input;
    }

    return input
        .toLowerCase()
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
};

export default formatCategoryLabel;
