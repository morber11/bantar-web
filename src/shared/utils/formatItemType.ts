export default function formatItemType(type: string): string {
    if (!type) {
        return '';
    }

    const lower = type.toLowerCase();

    if (lower === 'ai') {
        return 'AI';
    }

    if (lower === 'mindreader') {
        return 'Mind Reader';
    }

    return `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
}