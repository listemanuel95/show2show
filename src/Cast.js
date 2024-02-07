import CastMember from './CastMember'
import { useState, useEffect, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { fuzzyFilter } from 'fuzzbunny';
import { Search, SearchIconWrapper, StyledInputBase } from './search/Search';

function Cast(props) {

	const [castMembers, setCastMembers] = useState(props.castMembers || []);
	const [filterData, setFilterData] = useState("");
	const filterRef = useRef(null);
	const unfilteredCastMembers = props?.castMembers;
	const onMemberClicked = props?.onMemberClicked;

	useEffect(() => {
		setCastMembers(props.castMembers || []);
	}, [props.castMembers]);

	useEffect(() => {
		// Set focus on the input element after state update
		if (filterRef.current) {
		  filterRef.current.focus();
		}
	}, [filterData]);

	const membersFiltered = (event) => {
		// update state with the input value
		const input = event.target.value;
		setFilterData(input);

		// flatten the array so that it works with the fuzzy search
		const flat = unfilteredCastMembers.map((member) => {
			return {id: member.id, name: member.name, charName: member.roles[0].character};
		});

		// apply the fuzzy on both fields
		const results = fuzzyFilter(flat, input, {fields: [`name`, `charName`]});

		// TODO: play around with the score value, to ignore low quality matches
		// remap the results into an array with the proper format
		const filteredCastMembers = results.map((result) => {
			return unfilteredCastMembers.filter((member) => member.id === result.item.id)[0];
		});

		// set the new state
		setCastMembers(filteredCastMembers);
	}

	return (
		<>
			{ castMembers ?
				<>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Filter…"
							value={filterData}
							inputRef={filterRef}
							onChange={membersFiltered}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<div>
						{ castMembers.map((member, idx) => <CastMember onClick={onMemberClicked} actor={member} key={idx}/>) } 
					</div>
				</>
				: <></> }
		</>
	);
}

export default Cast;
