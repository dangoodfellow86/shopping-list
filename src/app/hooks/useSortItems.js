import { useState, useMemo } from 'react';

export default function useSortItems(items) {
    const [sortBy, setSortBy] = useState('');

    const sortedItems = useMemo(() => {
        if (sortBy === "category") {
            return [...items].sort((a, b) => {
                if (a.category < b.category) return -1;
                if (a.category > b.category) return 1;
                return 0;
            });
        }
        return items;
    }, [items, sortBy]);

    return { sortBy, setSortBy, sortedItems };
}