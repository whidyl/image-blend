import React from 'react';

interface Props {
	label: string;
	value: boolean;
    id: string;
	toggle: () => void;
}

const Toggle: React.FC<Props> = ({ label, value, toggle, id }) => {
	const checked = () => (
		<span className="relative">
			<span className="block w-10 h-6 bg-muidark-2 rounded-full shadow-inner"></span>
			<span className="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-white transform translate-x-full">
				<input
					id={`checked${id}`}
					type="checkbox"
					className="absolute opacity-0 w-0 h-0"
				/>
			</span>
		</span>
	);

	const unChecked = () => (

			<span className="relative">
				<span className="block w-10 h-6 bg-muidark-2 rounded-full shadow-inner"></span>
				<span className="absolute block w-4 h-4 mt-1 ml-1 bg-muidark-5 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
					<input
						id={`unchecked-${id}`}
						type="checkbox"
						className="absolute opacity-0 w-0 h-0"
					/>
				</span>
			</span>

	);

	return (
		<label
			htmlFor={value ?  `unchecked-${id}` : `checked-${id}`}
			className="inline-flex items-center cursor-pointer"
            onClick={() => toggle()}
		>
            <span className="mr-4 text-sm font-medium text-white">{label}: </span>
			{value ? checked() : unChecked()}
			
		</label>
	);
};

export default Toggle;
