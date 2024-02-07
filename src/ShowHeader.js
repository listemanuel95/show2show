import './ShowHeader.css';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

function ShowHeader(props) {

	const name = props?.name
	const image = props?.imageSrc

	return (
		<div className="show">
			{ name && image ? 
				<>
					<Tooltip title={ name }>
						{ image ? <Avatar src={image}/> : <Avatar/> } 
					</Tooltip>
					<Typography className="show-title" align="left" variant="h5" component="div" sx={{ flexGrow: 1}}>
						{ name }
					</Typography>
				</>
			: 'Loading Show' }
		</div>
	);
}

export default ShowHeader;
