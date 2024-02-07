import { useState, useEffect } from 'react';
import ArrowIcon from '@mui/icons-material/East';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import './LinkingBreadcrumb.css';

function LinkingBreadcrumb(props) {

	const imageUrl = 'https://image.tmdb.org/t/p/original/';
	const [data, setData] = useState([]);
	
	useEffect(() => {
		setData(props.data);
	}, [props]);

	return (
		<div className="linking-breadcrumb">
			{ data ? data.map((it) => {
				return (
					<div className="selection-div" key={it.id}>
						<Tooltip title={it.data.name}>
							<Avatar src={imageUrl + it.data.image}/>
						</Tooltip>
						<ArrowIcon color="secondary"/>
					</div>
				)
			}) : 'Loading Data' }
		</div>
	);
}

export default LinkingBreadcrumb;
