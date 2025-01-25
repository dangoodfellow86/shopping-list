import { useState, useMemo } from 'react';

export default function useFilterLists(lists) {
    const [activeTab, setActiveTab] = useState('open');

    const filteredLists = useMemo(() => {
        if (activeTab === 'open') {
            return lists.filter(list => !list.completed);
        }
        return lists.filter(list => list.completed);
    }, [lists, activeTab]);

    return { activeTab, setActiveTab, filteredLists };
}