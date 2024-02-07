import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Show(props) {

	const imageUrl = 'https://image.tmdb.org/t/p/original/';
	const show = props?.show
	const onClick = props?.onClick

	return (
		<div>
			{ show ?
				<Card sx={{ display: 'flex', margin: '1rem' }}>
					<CardActionArea onClick={onClick} sx={{ display: 'flex', justifyContent: 'flex-start' }} id={show.id}>
						<CardMedia
							component="img"
							sx={{ width: 150, height: 150, padding: '0.5rem', borderRadius: '1rem'}}
							image={imageUrl + show.poster_path}
							alt={show.name}
						/>
						<CardContent sx={{ selfAlign: 'left' }}>
							<Typography align="left" variant="h4" component="div" sx={{ flexGrow: 1, color: "secondary.main" }}>
								{ show.name }
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				: 'Loading show...' }
		</div>
	);

}

export default Show;
