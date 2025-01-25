import React, { useState } from "react";
import { auth } from "../../firebase";
import { useRouter, usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
	const [user, loading, error] = useAuthState(auth);
	const router = useRouter();
	const pathname = usePathname();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleGoBack = () => {
		router.push("/");
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const isHomePage = pathname === "/";

	return (
		<div>
			<nav className='bg-white text-black shadow-sm'>
				<div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16 items-center'>
						<div className='flex items-center'>
							{!isHomePage && (
								<button
									onClick={handleGoBack}
									className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4'>
									Back
								</button>
							)}
							<h1 className='text-xl font-semibold text-black'>
								Shopping List App
							</h1>
						</div>
						<div className='hidden sm:flex flex-start items-center'>
							<span className='text-gray-700 mr-4'>{user?.email}</span>
							<button
								onClick={() => auth.signOut()}
								className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
								Sign Out
							</button>
						</div>
						<div className='sm:hidden'>
							<button
								onClick={toggleSidebar}
								className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
								<span className='sr-only'>Open sidebar</span>
								<svg
									className='h-6 w-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M4 6h16M4 12h16M4 18h16'
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div
					className={`sm:hidden fixed inset-y-0 right-0 w-64 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${
						isSidebarOpen ? "translate-x-0" : "translate-x-full"
					}`}>
					<div className='px-4 py-6'>
						<div className='flex justify-between items-center'>
							<h2 className='text-xl font-semibold text-black'>
								Shopping List App
							</h2>
							<button
								onClick={toggleSidebar}
								className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
								<span className='sr-only'>Close sidebar</span>
								<svg
									className='h-6 w-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>
						<div className='mt-4'>
							<span className='block text-gray-700 mb-2'>{user?.email}</span>
							<button
								onClick={() => {
									auth.signOut();
									toggleSidebar();
								}}
								className='block w-full text-left px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
