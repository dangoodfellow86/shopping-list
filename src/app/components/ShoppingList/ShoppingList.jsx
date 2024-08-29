"use client";
import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase";
import ShoppingListItem from "./ShoppingListItem/ShoppingListItem";
import Link from "next/link";

export default function ShoppingList({ list, onDelete }) {
	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [error, setError] = useState("");

	useEffect(() => {
		if (list && Array.isArray(list.items)) {
			setItems(list.items);
		}
	}, [list]);

	if (!list || !list.id) {
		return <div>Loading list...</div>;
	}

	const addItem = async (e) => {
		e.preventDefault();
		if (newItem.trim()) {
			const listRef = doc(db, "shoppingLists", list.id);
			try {
				const newItemObject = {
					name: newItem.trim(),
					completed: false,
					quantity: quantity,
					user: auth.currentUser.email,
				};
				await updateDoc(listRef, {
					items: arrayUnion(newItemObject),
				});
				setItems([...items, newItemObject]);
				setNewItem("");
				setQuantity(0);
			} catch (error) {
				console.error("Error adding item:", error);
				setError("Failed to add item. Please try again.");
			}
		}
	};

	const removeItem = async (item) => {
		try {
			const listRef = doc(db, "shoppingLists", list.id);
			await updateDoc(listRef, {
				items: arrayRemove(item),
			});
			setItems(items.filter((i) => i.name !== item.name));
		} catch (error) {
			console.error("Error removing item:", error);
			setError("Failed to remove item. Please try again.");
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

			// Update local state
			setItems(reorderedItems);

			// Update Firestore
			const listRef = doc(db, "shoppingLists", list.id);
			await updateDoc(listRef, {
				items: reorderedItems,
			});
		} catch (err) {
			console.error("Error toggling item:", err);
			setError("Failed to update item. Please try again.");
		}
	};

	return (
		<div className='bg-white shadow overflow-hidden sm:rounded-lg mb-6'>
			<div className='px-4 py-5 sm:px-6 flex justify-between items-center'>
				<Link href={`/List/${list.id}`}>
					<h2 className='text-lg leading-6 font-medium text-gray-900 cursor-pointer hover:text-indigo-600'>
						{new Date(list.name).toLocaleDateString("en-GB", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})}
					</h2>
				</Link>
				<button
					onClick={onDelete}
					className='ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
					Delete List
				</button>
			</div>
			<div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
				<form
					onSubmit={addItem}
					className='sm:px-6 sm:py-5 border-b border-gray-200'>
					<div className='flex'>
						<input
							type='text'
							value={newItem}
							onChange={(e) => setNewItem(e.target.value)}
							placeholder='Add new item'
							className='flex-grow text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/4 sm:text-sm border-gray-300 rounded-md p-2'
						/>
						<p className='text-black text-right pt-2 w-1/4'>Amount: </p>
						<input
							type='number'
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							placeholder='Quantity'
							className='ml-3 p-2 text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/4 sm:text-sm border-gray-300 rounded-md'
						/>
						<button
							type='submit'
							className='ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
							Add
						</button>
					</div>
				</form>
				{error && <p className='text-red-500 mt-2'>{error}</p>}
				<ul className='divide-y divide-gray-200'>
					{items.map((item, index) => (
						<ShoppingListItem
							key={index}
							item={item}
							onToggle={() => toggleItem(item)}
							onRemove={() => removeItem(item)}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}
