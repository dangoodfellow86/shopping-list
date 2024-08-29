export default function ShoppingListItem({ item, onToggle, onRemove }) {
	return (
		<li className='px-6 py-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<input
						type='checkbox'
						checked={item.completed}
						onChange={onToggle}
						className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
					/>

					<span
						className={`ml-3 ${
							item.completed ? "line-through text-gray-500" : "text-gray-900"
						}`}>
						{item.name} x {item.quantity}
					</span>
				</div>
				<button
					onClick={onRemove}
					className='ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
					Remove
				</button>
			</div>
		</li>
	);
}
