import React, { useState } from "react";

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
	const [itemsToAdd, setItemsToAdd] = useState([]);
	const [newItem, setNewItem] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [category, setCategory] = useState("");

	const handleAddItem = () => {
		setItemsToAdd([...itemsToAdd, { newItem, quantity, category }]);
		setNewItem("");
		setQuantity(0);
		setCategory("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		itemsToAdd.forEach((item) =>
			onAddItem(item.newItem, item.quantity, item.category)
		);
		setItemsToAdd([]);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
			<div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
				<div className='mt-3 text-center'>
					<h3 className='text-lg leading-6 font-medium text-gray-900'>
						Add New Items
					</h3>
					<form
						onSubmit={handleSubmit}
						className='mt-2 px-4'>
						<input
							type='text'
							value={newItem}
							onChange={(e) => setNewItem(e.target.value)}
							placeholder='Item Name'
							className='mt-2 w-full p-2 border rounded-md'
						/>
						<input
							type='number'
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							placeholder='Quantity'
							className='mt-2 w-full p-2 border rounded-md'
						/>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className='mt-2 w-full p-2 border rounded-md'>
							<option value=''>Select Category</option>
							<option value='Frozen'>Frozen</option>
							<option value='Fresh'>Fresh</option>
							<option value='Meat'>Meat</option>
							<option value='Veg'>Veg</option>
							<option value='Fruit'>Fruit</option>
							<option value='Other'>Other</option>
						</select>
						<div className='mt-4 flex justify-between'>
							<button
								type='button'
								onClick={handleAddItem}
								className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'>
								Add Item
							</button>
							<button
								type='submit'
								className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>
								Done
							</button>
							<button
								type='button'
								onClick={onClose}
								className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddItemModal;
