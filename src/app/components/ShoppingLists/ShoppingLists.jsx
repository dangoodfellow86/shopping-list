"use client";
import { useState, useEffect } from "react";
import {
	collection,
	query,
	where,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ShoppingList from "../ShoppingList/ShoppingList";
import CreateListForm from "../CreateList/CreateListForm/CreateListForm";
import Link from "next/link";

export default function ShoppingLists({ user }) {
	const [lists, setLists] = useState([]);
	const [activeTab, setActiveTab] = useState("open");

	useEffect(() => {
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

	const createList = async (name) => {
		await addDoc(collection(db, "shoppingLists"), {
			name,
			userId: user.uid,
			items: [],
			completed: false,
		});
	};

	const deleteList = async (listId) => {
		await deleteDoc(doc(db, "shoppingLists", listId));
	};

	return (
		<div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
			<h1 className='text-3xl font-bold text-center text-gray-900 mb-6'>
				My Shopping Lists
			</h1>
			<CreateListForm onSubmit={createList} />
			<div className='border-b border-gray-200'>
				<nav
					className='-mb-px flex space-x-8'
					aria-label='Tabs'>
					<button
						onClick={() => setActiveTab("open")}
						className={`${
							activeTab === "open"
								? "border-indigo-500 text-indigo-600"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
						} whitespace-nowrap border-b-2 px-1 py-4 font-medium text-sm`}>
						Open Lists
					</button>
					<button
						onClick={() => setActiveTab("completed")}
						className={`${
							activeTab === "completed"
								? "border-indigo-500 text-indigo-600"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
						} whitespace-nowrap border-b-2 px-1 py-4 font-medium text-sm`}>
						Completed Lists
					</button>
				</nav>
			</div>
			{lists.length === 0 ? (
				<p className='text-center text-gray-500 mt-4'>
					No lists yet. Create one to get started!
				</p>
			) : (
				<>
					{activeTab === "open" && (
						<div>
							{lists
								.filter((list) => !list.completed)
								.map((list) => (
									<div
										className='cursor-pointer'
										key={list.id}>
										<ShoppingList
											list={list}
											onDelete={() => deleteList(list.id)}
										/>
									</div>
								))}
						</div>
					)}
					{activeTab === "completed" && (
						<div>
							{lists
								.filter((list) => list.completed)
								.map((list) => (
									<div
										className='cursor-pointer'
										key={list.id}>
										<ShoppingList
											list={list}
											onDelete={() => deleteList(list.id)}
										/>
									</div>
								))}
						</div>
					)}
				</>
			)}
		</div>
	);
}
