import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function CastMember(props) {

	const imageUrl = 'https://image.tmdb.org/t/p/original/';
	const actor = props?.actor
	const onClick = props?.onClick

	return (
		<div>
			{ actor ?
				<Card sx={{ display: 'flex', margin: '1rem' }}>
					<CardActionArea onClick={onClick} sx={{ display: 'flex', justifyContent: 'flex-start' }} id={actor.id}>
						<CardMedia
							component="img"
							sx={{ width: 150, height: 150, padding: '0.5rem', borderRadius: '1rem'}}
							image={imageUrl + actor.profile_path}
							alt={actor.name}
						/>
						<CardContent sx={{ selfAlign: 'left' }}>
							<Typography align="left" variant="h4" component="div" sx={{ flexGrow: 1, color: "secondary.main" }}>
								{ actor.name }
							</Typography>
							<Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1, color: "primary.main" }}>
								as { actor.roles[0].character } ({ actor.roles[0].episode_count } episodes)
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				: 'Loading actor...' }
		</div>
	);
}

export default CastMember;
