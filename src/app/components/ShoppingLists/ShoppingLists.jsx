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
			{lists.map((list) => (
				<div className='cursor-pointer'>
					<ShoppingList
						list={list}
						onDelete={() => deleteList(list.id)}
					/>
				</div>
			))}
		</div>
	);
}
