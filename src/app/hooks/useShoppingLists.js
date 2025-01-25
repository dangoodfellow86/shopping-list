import { useState, useEffect } from "react";
import {
    collection,
    query,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export default function useShoppingLists(user) {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        if (!user) {
            setLists([]);
            return;
        }
        const q = query(collection(db, "shoppingLists"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLists(listsData);
        });

        return () => unsubscribe();
    }, [user]);

    return { lists };
}