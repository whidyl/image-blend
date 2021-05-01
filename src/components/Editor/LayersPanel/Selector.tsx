import React, { useState } from 'react';

interface Props {
	options: string[];
}

const Selector: React.FC<Props> = ({ options }) => {
	const [open, setOpen] = useState(false);

	const Options = () => (
		<>
			{options.map((option) => (
				<>
					<div className="flex items-center">
						<span className="font-normal ml-3 block truncate">{option}</span>
					</div>
					<span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
						<svg
							className="h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
				</>
			))}
		</>
	);

	const DropdownContent = () => (
		<>
			<ul
				className="absolute z-20 mt-1 w-44 right-1 bg-white shadow-lg max-h-24 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
				tabIndex={-1}
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
			>
				<li
					className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
					id="listbox-option-0"
					role="option"
				>
					<Options />
				</li>
			</ul>
		</>
	);

	return (
		<div>
			<div className="mt-1 relative">
				<label className="mr-8">Effect: </label>
				<button
					type="button"
					className="relative w-44 bg-muidark-2 border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					aria-haspopup="listbox"
					aria-expanded="true"
					aria-labelledby="listbox-label"
					onClick={() => setOpen(!open)}
				>
					<span className="flex items-center">
						<span className="ml-3 block truncate text-sm text-white">
							Tom Cook
						</span>
					</span>
					<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<svg
							className="h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
				</button>

				{open ? <DropdownContent /> : null}
			</div>
		</div>
	);
};

export default Selector;
