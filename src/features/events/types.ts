export interface EventStyle {
    style?: {
        light?: string;
        dark?: string;
    };
}

export interface EventItem {
    id: string;
    name: string;
    friendlyName?: string;
    style?: EventStyle;
    fromDate?: string;
    untilDate?: string;
    questions?: Array<{ id: number; text: string }>;
}
