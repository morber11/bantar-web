export default function formatItemType(type: string): string {
    if (!type) {
        return '';
    }

    if (type.toLowerCase() === 'ai') {
        return 'AI';
    }

    return `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
}