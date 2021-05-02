import axios from 'axios';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Props {
	query: string;
	needsRefresh: MutableRefObject<boolean>;
	setQuery: (query: string) => void;
	setURL: (url: string) => void;
}

const ImgSearchBox: React.FC<Props> = ({ query, needsRefresh, setQuery, setURL }) => {
	const [disableRefresh, setDisableRefresh] = useState(false);
	let didMount = useRef(false);

    const updateURL = async () => {
		const response = await axios.get(
			`https://source.unsplash.com/random/?${query.replaceAll(' ', '-')}`
		);
		setURL(response.request.responseURL);
    }

	useEffect(() => {
		// don't issue refresh on first render, the search box is remade every time the window is collapsed.
		if (!didMount.current) {
			didMount.current = true;
			
		} else {
			const timeoutID = setTimeout(updateURL, 1000);

			return () => {
				clearTimeout(timeoutID);
			};
		}

		if (needsRefresh.current) {
			updateURL();
			needsRefresh.current = false;
		} 

        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	const onRefreshClick = () => {
		setDisableRefresh(true);
		setTimeout(() => setDisableRefresh(false), 2000);
		updateURL();
	};

	return (
		<span className="mb-1 mt-2 flex items-center">
			<label className="ml-1 mr-7 text-white text-sm font-medium">
				Search:
			</label>
			<input
				type="text"
				placeholder="Image search query"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className=" mr-2 px-1 pl-2 py-2 w-9 basic-clickable rounded-md bg-muidark-2 shadow-inner flex-grow placeholder-white placeholder-opacity-30"
			/>
			<button
				className={`mr-1 p-2 w-8 h-8 bg-muidark-2 basic-clickable disabled:opacity-50 ${
					disableRefresh ? 'cursor-default' : ''
				}`}
				disabled={disableRefresh}
				onClick={() => onRefreshClick()}
			>
				<img
					className={`opacity-50 ${
						disableRefresh ? '' : 'hover:opacity-100 cursor-pointer '
					} `}
					src="icons8-refresh-30.png"
					alt="expand layer"
				/>
			</button>
		</span>
	);
};

export default ImgSearchBox;
