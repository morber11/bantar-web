import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllEvents } from '../api';
import type { EventItem } from '../types';

export function useFetchEvents() {
    const key = useMemo(() => ['events-list'], []);

    const query = useQuery<EventItem[], Error>({
        queryKey: key,
        queryFn: () => fetchAllEvents(),
    });

    // events returns events detail with a list of questions in it - need to flatten to get questions
    const list = (query.data ?? []).flatMap((ev) => {
        const label = ev.friendlyName ?? ev.name;
        if (!ev.questions || ev.questions.length === 0) return [] as Array<{ id: string; text: string; categories?: string[] }>;
        return ev.questions.map((q) => ({ id: `${ev.id}-${q.id}`, text: q.text, categories: [label] }));
    });

    const eventName = query.data?.[0]?.friendlyName ?? query.data?.[0]?.name ?? 'Events';
    const eventStyle = query.data?.[0]?.style?.style ?? null;
    const available = !query.isError && (query.data?.length ?? 0) > 0;

    return {
        list,
        eventName,
        eventStyle,
        available,
        loading: query.isLoading,
        error: query.isError ? (query.error?.message ?? 'Unknown error') : null,
    };
}
