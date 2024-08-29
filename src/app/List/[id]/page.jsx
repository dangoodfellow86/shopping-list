"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import Navbar from "@/app/components/NavBar/Navbar";

export default function ListPage() {
	const { id } = useParams();
	const [list, setList] = useState(null);

	useEffect(() => {
		// if (!router.isReady) return;

		console.log("id");
		const unsubscribe = onSnapshot(doc(db, "shoppingLists", id), (doc) => {
			if (doc.exists()) {
				setList({ id: doc.id, ...doc.data() });
			} else {
				console.log("No such document!");
				// Optionally, redirect to a 404 page or show an error message
			}
		});

		return () => unsubscribe();
	}, [id]);

	// if (!router.isReady || !list) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<div>
			<Navbar />

			<div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 min-h-screen bg-gray-100'>
				<ShoppingList list={list} />
			</div>
		</div>
	);
}
