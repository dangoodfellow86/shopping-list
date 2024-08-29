import React from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
	const [user, loading, error] = useAuthState(auth);
	const router = useRouter();

	const handleGoBack = () => {
		router.push("/");
	};

	return (
		<div>
			<nav className='bg-white text-black shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16'>
						<div className='flex items-center'>
							<button
								onClick={handleGoBack}
								className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4'>
								Back
							</button>
							<h1 className='text-xl font-semibold text-black'>
								Shopping List App
							</h1>
						</div>
						<div className='flex flex-start items-center'>
							<span className='text-gray-700 mr-4'>{user.email}</span>
							<button
								onClick={() => auth.signOut()}
								className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
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
