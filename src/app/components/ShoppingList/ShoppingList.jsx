"use client";
import React, { useState } from "react";
import useShoppingList from "../../hooks/useShoppingList";
import useSortItems from "../../hooks/useSortItems";
import ShoppingListItem from "./ShoppingListItem/ShoppingListItem";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AddItemModal from "./AddItemModal/AddItemModal";

export default function ShoppingList({ list, onDelete }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { items, error, addItem, removeItem, toggleItem } =
		useShoppingList(list);
	const { sortBy, setSortBy, sortedItems } = useSortItems(items);

	const markAsCompleted = async (listId) => {
		try {
			const listRef = doc(db, "shoppingLists", listId);
			await updateDoc(listRef, {
				completed: true,
			});
		} catch (error) {
			console.error("Error marking list as completed:", error);
		}
	};

	const handleAddItem = async (newItem, quantity, category) => {
		const success = await addItem(newItem, quantity, category);
	};

	const handleSortChange = (e) => {
		setSortBy(e.target.value);
	};

	if (!list || !list.id) {
		return <div>Loading list...</div>;
	}

	return (
		<div className='bg-white shadow overflow-hidden sm:rounded-lg mb-6 mt-5'>
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
				<div className='flex'>
					<button
						onClick={() => markAsCompleted(list.id)}
						className='ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
						Mark as Completed
					</button>
					<button
						onClick={onDelete}
						className='ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
						Delete List
					</button>
				</div>
			</div>
			<div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
				<button
					onClick={() => setIsModalOpen(true)}
					className='ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
					Add Item
				</button>
				<AddItemModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onAddItem={handleAddItem}
				/>
				{error && <p className='text-red-500 mt-2'>{error}</p>}
				{sortBy === "category" ? (
					Object.entries(
						sortedItems.reduce((acc, item) => {
							acc[item.category] = acc[item.category] || [];
							acc[item.category].push(item);
							return acc;
						}, {})
					)
						.sort((a, b) => {
							if (a[0] < b[0]) return -1;
							if (a[0] > b[0]) return 1;
							return 0;
						})
						.map(([category, items]) => (
							<div key={category}>
								<h3 className='px-6 py-3 font-semibold text-gray-700'>
									{category}
								</h3>
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
						))
				) : (
					<ul className='divide-y divide-gray-200'>
						{sortedItems.map((item, index) => (
							<ShoppingListItem
								key={index}
								item={item}
								onToggle={() => toggleItem(item)}
								onRemove={() => removeItem(item)}
							/>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
