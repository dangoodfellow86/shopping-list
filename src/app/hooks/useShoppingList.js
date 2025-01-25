import { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function useShoppingList(list) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (list && Array.isArray(list.items)) {
            setItems(list.items);
        }
    }, [list]);

    const addItem = async (newItem, quantity, category) => {
        if (newItem.trim()) {
            const listRef = doc(db, "shoppingLists", list.id);
            try {
                const newItemObject = {
                    name: newItem.trim(),
                    completed: false,
                    quantity: quantity,
                    category: category,
                    user: auth.currentUser.email,
                };
                await updateDoc(listRef, {
                    items: arrayUnion(newItemObject),
                });
                setItems([...items, newItemObject]);
                return true;
            } catch (error) {
                console.error("Error adding item:", error);
                setError("Failed to add item. Please try again.");
                return false;
            }
        }
        return false;
    };

    const removeItem = async (item) => {
        try {
            const listRef = doc(db, "shoppingLists", list.id);
            await updateDoc(listRef, {
                items: arrayRemove(item),
            });
            setItems(items.filter((i) => i.name !== item.name));
            return true;
        } catch (error) {
            console.error("Error removing item:", error);
            setError("Failed to remove item. Please try again.");
            return false;
        }
    };

    const toggleItem = async (item) => {
        try {
            const updatedItems = items.map((i) =>
                i.name === item.name ? { ...i, completed: !i.completed } : i
            );

            // Reorder items: uncompleted items first, then completed items
            const uncompletedItems = updatedItems.filter((i) => !i.completed);
            const completedItems = updatedItems.filter((i) => i.completed);
            const reorderedItems = [...uncompletedItems, ...completedItems];

            setItems(reorderedItems);

            const listRef = doc(db, "shoppingLists", list.id);
            await updateDoc(listRef, {
                items: reorderedItems,
            });
            return true;
        } catch (err) {
            console.error("Error toggling item:", err);
            setError("Failed to update item. Please try again.");
            return false;
        }
    };

    return { items, error, addItem, removeItem, toggleItem };
}
