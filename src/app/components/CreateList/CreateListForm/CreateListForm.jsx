"use client";
import { useState } from "react";

export default function CreateListForm({ onSubmit }) {
	const [name, setName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name.trim()) {
			onSubmit(name.trim());
			setName("");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='mb-8'>
			<div className='flex text-black'>
				<input
					type='date'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='New list name'
					required
					className='flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4'
				/>
				<button
					type='submit'
					className='ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
					Create List
				</button>
			</div>
		</form>
	);
}
