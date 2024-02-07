import { Search, SearchIconWrapper, StyledInputBase } from './search/Search';
import { useEffect, useState, useRef } from 'react';
import { fuzzyFilter } from 'fuzzbunny';
import SearchIcon from '@mui/icons-material/Search';

import Show from './Show'

function Shows(props) {

	const [shows, setShows] = useState(props.shows || []);
	const [filterData, setFilterData] = useState("");
	const filterRef = useRef(null);
	const unfilteredShows = props?.shows;
	const onShowClicked = props?.onShowClicked;

	useEffect(() => {
		setShows(props.shows || []);
		console.log(props.shows);
	}, [props.shows]);

	useEffect(() => {
		// Set focus on the input element after state update
		if (filterRef.current) {
		  filterRef.current.focus();
		}
	}, [filterData]);

	const showsFiltered = (event) => {
		// update state with the input value
		const input = event.target.value;
		setFilterData(input);

		// flatten the array so that it works with the fuzzy search
		const flat = unfilteredShows.map((show) => {
			return { id: show.id, name: show.name };
		});

		// apply the fuzzy on both fields
		const results = fuzzyFilter(flat, input, {fields: [`name`]});

		// TODO: play around with the score value, to ignore low quality matches
		// remap the results into an array with the proper format
		const filteredShows = results.map((result) => {
			return unfilteredShows.filter((show) => show.id === result.item.id)[0];
		});

		// set the new state
		setShows(filteredShows);
	}

	return (
		<>
			{ shows ?
				<>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Filter…"
							value={filterData}
							inputRef={filterRef}
							onChange={showsFiltered}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<div>
						{ shows.map((show, idx) => <Show onClick={onShowClicked} show={show} key={idx}/>) } 
					</div>
				</>
				: <></> }
		</>
	);
}

export default Shows;
